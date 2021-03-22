<?php

namespace App\Http\Controllers\Api\V1;

use App\Product;
use App\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('id', 'DESC')->select('name', 'description','quantity', 'id')
        ->with('suppliers')
        ->get();

        return response()->json([
            'products' => $products,   
        ], 200); 
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => ['required'],
            'description' => ['required'],
            'quantity' => ['required', 'numeric'],
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors(), 
                'code' => 400
            ]);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity
        ]);

        $confirmed_existing_suppliers = [];
        foreach($request->supplier_ids as $id) {
            if (Supplier::where('id', $id)->exists()) {
                array_push($confirmed_existing_suppliers, $id);   
            }
        }
        $product->suppliers()->sync($confirmed_existing_suppliers);


        return response()->json([
            'message' => 'Saved',   
        ], 200); 
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
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
        $product = Product::find($id);

        if (empty($product)) {
            return response()->json([
                'message' => 'Product Not found'
            ], 404);
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'quantity' => $request->quantity
        ]);

        $confirmed_existing_suppliers = [];
        foreach($request->supplier_ids as $id) {
            if (Supplier::where('id', $id)->exists()) {
                array_push($confirmed_existing_suppliers, $id);   
            }
        }
        $product->suppliers()->sync($confirmed_existing_suppliers);

        return response()->json([
            'message' => 'Updated',   
        ], 200); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (empty($product)) {
            return response()->json([
                'message' => 'Product Not found'
            ], 404);
        }

        $product->suppliers()->sync([]);
        $product->delete();

        return response()->json([
            'message' => 'Deleted',   
        ], 200); 
    }
}
