<?php

namespace App\Http\Controllers\Api\V1;

use App\OrderDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $current_id = OrderDetail::select('id')->first();

        if(!is_null($record))
    
        // $record->update([
        //     'id' => $record->id + 1,
        // ]);

        // return $record->id
        // $rules = [
        //     'name' => ['required'],
        // ];

        // $validator = Validator::make($request->all(), $rules);

        // if($validator->fails()){
        //     return response()->json([
        //         'errors' => $validator->errors(), 
        //     ], 400);
        // }

        // $supplier = Supplier::create([
        //     'name' => $request->name,
        // ]);

        return response()->json([
            'message' => $record,   
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
