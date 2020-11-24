<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Section;

class DashboardController extends Controller
{
    public function getSections()
    {
        $sections = Section::get();
        return response()->json([
            "data" => $sections,
        ], 201);
    }

    public function getBooksFromSection(Request $request) {
        $targetSection = $request->section;
        $books = Book::where('section_name', $targetSection)->get();
        return response()->json([
            "data" => $books,
        ], 201);
    }
}
