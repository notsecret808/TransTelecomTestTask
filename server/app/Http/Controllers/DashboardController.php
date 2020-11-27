<?php

namespace App\Http\Controllers;

use App\Models\Admin_Key;
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
            ], 500);
        } else {
            $UserImg = Book::where('id', $id)->value('book_cover');
            $url = str_replace('/storage/', '', $UserImg);
            $fileDeleteResult = Storage::disk('public')->delete($url);
            if ($fileDeleteResult == false) {
                return response()->json([
                    "error" => "file deletion failed",
                    'url' => $url
                ], 500);
            }
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
                    'bookName' => 'required|string|max:150',
                    'bookAuthor' => 'required|string|max:100',
                    'bookDescription' => 'required|string|max:2000',
                    'bookPublished' => 'string|max:4',
                    'bookCover' => 'mimes:jpeg,png,jpg|max:500',
                    'sectionName' => 'required|string|max:150',
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
                $email = ($request->user())['email'];

                $book = new Book([
                    'book_name' => $validated['bookName'],
                    'book_author' => $validated['bookAuthor'],
                    'book_description' => $validated['bookDescription'],
                    'book_published' => $book_published,
                    'book_cover' => $url,
                    'section_name' => $validated['sectionName'],
                    'email' => $email
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

    public function editBook(Request $request)
    {
        if ($request->hasFile('bookCover')) {
            if ($request->file('bookCover')->isValid()) {
                $validated = $request->validate([
                    'id' => 'required',
                    'bookName' => 'required|string|min:1|max:150',
                    'bookAuthor' => 'required|string|min:1|max:100',
                    'bookDescription' => 'required|string|min:1|max:2000',
                    'bookPublished' => 'string|max:4',
                    'bookCover' => 'mimes:jpeg,png,jpg|min:1|max:500',
                    'sectionName' => 'required|string|min:1|max:150',
                ]);

                $id = $validated['id'];
                $email = ($request->user())['email'];
                $UserBook = Book::where('id', $id)->where('email', $email);
                $findEmail = Admin_Key::where('email', ($request->user())['email'])->first();
                if ($UserBook->first() == null && $findEmail == null) {
                    return response()->json([
                        "error" => "You didn't added the book and you are not admin"
                    ], 500);
                } else {
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
                    //delete old file
                    $UserImg = Book::where('id', $id)->value('book_cover');
                    if ($UserImg !== null) {
                        $url = str_replace('/storage/', '', $UserImg);
                        $fileDeleteResult = Storage::disk('public')->delete($url);
                        if ($fileDeleteResult == false) {
                            return response()->json([
                                "error" => "file deletion failed",
                                'url' => $url
                            ], 500);
                        }
                    } else {
                        return response()->json([
                            "error" => "book doesnt't exits"
                        ], 500);
                    }
                    //save new file
                    $extension = $request->bookCover->extension();
                    $url = bin2hex(random_bytes(8));
                    $request->bookCover->storeAs('/public', $url . "." . $extension);
                    $url = Storage::url($url . "." . $extension);

                    $book = Book::where('id', $id)->update([
                        'book_name' => $validated['bookName'],
                        'book_author' => $validated['bookAuthor'],
                        'book_description' => $validated['bookDescription'],
                        'book_published' => $book_published,
                        'book_cover' => $url,
                        'section_name' => $validated['sectionName'],
                        'email' => $email
                    ]);
                    return response()->json([
                        'message' => 'Book successfully edited!'
                    ], 201);
                }
            }
            abort(500, 'Could not upload image');
        } else {
            return response()->json([
                'message' => 'No image attached!!'
            ], 500);
        }
    }

    public function checkAdminRights(Request $request)
    {
        $findEmail = Admin_Key::where('email', ($request->user())['email'])->first();
        if ($findEmail != []) {
            return response()->json([
                'message' => 'authorisation passed successfully'
            ], 202);
        } else {
            return response()->json([
                'error' => 'this account does not have administrative privileges'
            ], 500);
        }
    }

    public function addSection(Request $request)
    {
        $validated = $request->validate([
            'section_name' => 'required|string|min:1|max:150',
            'section_description' => 'required|string|min:1|max:500',
        ]);
        $checkSection = Section::firstWhere('section_name', $validated['section_name']);
        if ($checkSection == null) {
            $section = new Section([
                'section_name' => $validated['section_name'],
                'section_description' => $validated['section_description'],
            ]);
            $section->save();
            return response()->json([
                'msg' => 'new section added!'
            ], 201);
        } else return response()->json([
            'section' => $checkSection,
            'error' => 'section already exist!'
        ], 500);
    }

    public function findBooks(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|min:1|max:150',
            'type' => 'required|string|min:1|max:11',
        ]);
        $type = $validated['type'];
        $query = $validated['query'];
        if ($type !== 'book_name' && $type !== 'book_author') {
            return response()->json([
                'message' => 'wrong type'
            ], 500);
        } else {
            try {
                $books = Book::where($type, $query)->get();
            } catch (\Exception $e) {
                return response()->json([
                    "error" => 'Nothing found',
                    'desc' => $e->getMessage()
                ], 500);
            }
            return response()->json([
                "data" => $books,
            ], 201);
        }
    }
}
