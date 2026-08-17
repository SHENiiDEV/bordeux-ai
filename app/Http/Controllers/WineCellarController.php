<?php

namespace App\Http\Controllers;

use App\Models\WineCellar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WineCellarController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $cellarWines = $user->wineCellar()->latest()->get();

        $totalValuation = $cellarWines->sum(fn($w) => $w->estimated_value * $w->bottle_count);
        $totalBottles = $cellarWines->sum('bottle_count');
        $avgRating = $cellarWines->avg('ai_rating') ?: 98.0;

        return Inertia::render('Cellar/Index', [
            'wines' => $cellarWines,
            'stats' => [
                'total_valuation' => $totalValuation,
                'total_bottles' => $totalBottles,
                'avg_rating' => round($avgRating, 1),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'wine_name' => 'required|string|max:200',
            'region' => 'nullable|string|max:200',
            'type' => 'nullable|string|max:100',
            'price_segment' => 'nullable|string|max:100',
            'vintage_year' => 'nullable|integer|min:1900|max:2090',
            'peak_drinking_start' => 'nullable|integer|min:1900|max:2090',
            'peak_drinking_end' => 'nullable|integer|min:1900|max:2090',
            'estimated_value' => 'nullable|numeric|min:0',
            'bottle_count' => 'nullable|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $user = $request->user();
        $user->wineCellar()->create([
            ...$validated,
            'ai_rating' => 98.5,
            'added_via' => 'manual',
        ]);

        return redirect()->back()->with('success', 'Bottle added to your private cellar.');
    }

    public function exportCsv(Request $request)
    {
        $user = $request->user();
        $wines = $user->wineCellar()->latest()->get();

        $filename = "bordeux_cellar_portfolio_" . date('Y-m-d') . ".csv";

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($wines) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Wine Name', 'Vintage', 'Region', 'Type', 'Segment', 'AI Rating', 'Bottles', 'Est Value (EUR)', 'Peak Window', 'Notes']);

            foreach ($wines as $w) {
                $window = ($w->peak_drinking_start && $w->peak_drinking_end) 
                    ? "{$w->peak_drinking_start}-{$w->peak_drinking_end}" 
                    : "Ready";

                fputcsv($file, [
                    $w->wine_name,
                    $w->vintage_year ?: 'N/A',
                    $w->region,
                    $w->type,
                    $w->price_segment,
                    $w->ai_rating,
                    $w->bottle_count,
                    $w->estimated_value,
                    $window,
                    $w->notes,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function destroy(Request $request, WineCellar $wine)
    {
        if ($wine->user_id !== $request->user()->id) {
            abort(403);
        }

        $wine->delete();

        return redirect()->back()->with('success', 'Bottle removed from cellar.');
    }
}
