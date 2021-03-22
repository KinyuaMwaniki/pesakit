<?php

namespace App\Http\Controllers\Api\V1;

use App\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = Supplier::orderBy('id')->select('name', 'id')->get();

        return response()->json([
            'suppliers' => $suppliers,   
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
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors(), 
            ], 400);
        }

        $supplier = Supplier::create([
            'name' => $request->name,
        ]);

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
        //
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
        $supplier = Supplier::find($id);

        if (empty($supplier)) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        $supplier->update([
            'name' => $request->name,
        ]);

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
        $supplier = Supplier::find($id);

        if (empty($supplier)) {
            return response()->json([
                'message' => 'Supplier Not found'
            ], 404);
        }

        $supplier->delete();

        return response()->json([
            'message' => 'Deleted',   
        ], 200); 
    }
}
