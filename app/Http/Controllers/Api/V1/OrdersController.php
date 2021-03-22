<?php

namespace App\Http\Controllers\Api\V1;

use App\Order;
use App\Product;
use App\OrderDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::orderBy('order_number', 'DESC')->select('order_number','id')
        ->with('products')->paginate(3);

        return response()->json([
            'orders' => $orders,   
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
        $latestOrder_id = Order::orderBy('created_at','DESC')->first()->id;
        $newid = null;
        if(is_null($latestOrder_id)) {
            $newid = 1;
        } else {
            $newid = $latestOrder_id + 1;
        }

        $order_number = '#'.str_pad($newid, 8, "0", STR_PAD_LEFT);

        $order = Order::create([
            'order_number' => $order_number
        ]);

        foreach($request->order_products as $id) {
            if (Product::where('id', $id)->exists()) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $id
                ]);
            }
        }
        return response()->json([
            'message' => 'success',
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
        $order = Order::find($id);

        if (empty($order)) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        $confirmed_existing_products = [];
        foreach($request->order_products as $id) {
            if (Product::where('id', $id)->exists()) {
                array_push($confirmed_existing_products, $id);   
            }
        }

        $order->products()->sync($confirmed_existing_products);

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
        $order = Order::find($id);

        if (empty($order)) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'message' => 'Deleted',   
        ], 200);
    }
}
