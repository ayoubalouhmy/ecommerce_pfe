<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth
use App\Http\Controllers\AuthController;
// Public & Client
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
// Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Products & Categories (Read-Only)
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| Protected Client Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Cart
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'getCart']);
        Route::post('/add', [CartController::class, 'addToCart']);
        Route::put('/{cartItem}', [CartController::class, 'updateQuantity']);
        Route::delete('/{cartItem}', [CartController::class, 'removeItem']);
        Route::delete('/', [CartController::class, 'clearCart']);
    });

    // Orders
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{order}', [OrderController::class, 'show']);
        Route::patch('/{order}/cancel', [OrderController::class, 'cancel']);
    });

    // Payments
    Route::prefix('payments')->group(function () {
        Route::post('/checkout', [PaymentController::class, 'checkout']);
        Route::post('/success', [PaymentController::class, 'success']);
        Route::post('/failed', [PaymentController::class, 'failed']);
    });
});


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    
    // Dashboard Stats
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Users Management
    Route::apiResource('users', UserController::class);

    // Products & Categories (Create, Update, Delete)
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);

    // Orders Management
    Route::apiResource('orders', AdminOrderController::class)->except(['store', 'destroy']);
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);

    // Payments Management
    Route::apiResource('payments', AdminPaymentController::class)->only(['index', 'show']);
    Route::post('/payments/{payment}/refund', [AdminPaymentController::class, 'refund']);
});
