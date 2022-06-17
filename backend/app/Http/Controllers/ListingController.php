<?php

namespace App\Http\Controllers;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Listing::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'price' => 'required',
            'title' => 'required|unique:listings|max:255',
            'description' => 'required',
            'address' => 'required|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
            //save image in storage
            Storage::disk('public')->put($imageName, file_get_contents($request->image));
            $url = Storage::url($imageName);
            
            return Listing::create([
                'title' => $request->title,
                'image' => $url,
                'description' => $request->description,
                'price' => $request->price,
                'address' => $request->address
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Listing::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $listing = Listing::findOrFail($id);

        $oldImage = $listing->image;
        $listing->update($request->all());

        if($request->image){
            $storage = Storage::disk('public'); 

            //delete old image
            if($storage->exists($oldImage))
                $storage->delete($oldImage);  

            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
            $url = Storage::url($imageName);
            $listing->image = $url;
            $storage->put($imageName, file_get_contents($request->image));
        }else {
            $listing->image = $oldImage;
        }
        $listing->save();

        return $listing;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Listing::destroy($id);
    }
}
