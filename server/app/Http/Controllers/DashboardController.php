<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    public function getSections()
    {
        $sections = Section::get();
        return response()->json([
            "data" => $sections,
        ], 201);
    }

    public function getBooksFromSection(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $targetSection = $content['section'];
        $books = Book::where('section_name', $targetSection)->get();
        return response()->json([
            "data" => $books,
        ], 201);
    }

    public function getAllBooks()
    {
        $books = Book::get();
        return response()->json([
            "data" => $books,
        ], 201);
    }

    public function removeBook(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $id = $content['id'];
        $email = ($request->user())['email'];
        $UserBook = Book::where('id', $id)->where('email', $email);
        if ($UserBook->get() == null) {
            return response()->json([
                "error" => "You didn't added the book"
            ]);
        } else {
            $UserBook->delete();
        }
        return response()->json([
            "success" => "book removed from db",
        ], 201);
    }

    public function addBook(Request $request)
    {
        if ($request->hasFile('bookCover')) {
            if ($request->file('bookCover')->isValid()) {
                $validated = $request->validate([
                    'bookName' => 'required||max:150',
                    'bookAuthor' => 'required|string|max:100',
                    'bookDescription' => 'required|string|max:2000',
                    'bookPublished' => 'string|max:4',
                    'bookCover' => 'mimes:jpeg,png,jpg|max:500',
                    'sectionName' => 'required|string|max:150',
                    'email' => 'required|email'
                ]);


                $book_published = null;
                if (array_key_exists('bookPublished', $validated) === true) {
                    $publish_year = intval($validated['bookPublished']);
                    if (is_int($publish_year) === false || $publish_year < 0) {
                        return response()->json([
                            "error" => "bookPublished not a positive integer!",
                            'bookPublished' => is_int($validated['bookPublished'])
                        ], 400);
                    }
                    $book_published = $validated['bookPublished'];
                }
                $section_name = Section::where('section_name', $validated['sectionName'])->get();
                if ($section_name == []) {
                    return response()->json([
                        "error" => "section name doesn't exist",
                    ], 400);
                }
                $extension = $request->bookCover->extension();
                $url = bin2hex(random_bytes(8));
                $request->bookCover->storeAs('/public', $url . "." . $extension);
                $url = Storage::url($url . "." . $extension);

                $book = new Book([
                    'book_name' => $validated['bookName'],
                    'book_author' => $validated['bookAuthor'],
                    'book_description' => $validated['bookDescription'],
                    'book_published' => $book_published,
                    'book_cover' => $url,
                    'section_name' => $validated['sectionName'],
                    'email' => $validated['email']
                ]);
                $book->save();
                return response()->json([
                    'message' => 'Book successfully added!'
                ], 201);
            }
            abort(500, 'Could not upload image');
        } else {
            return response()->json([
                'message' => 'No image attached!!'
            ], 500);
        }
    }
}
