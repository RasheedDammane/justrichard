'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewFoodProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      sku: formData.get('sku'),
      barcode: formData.get('barcode'),
      description: formData.get('description'),
      shortDescription: formData.get('shortDescription'),
      categoryId: formData.get('categoryId'),
      brandId: formData.get('brandId'),
      sellingPrice: parseFloat(formData.get('sellingPrice') as string),
      buyingPrice: parseFloat(formData.get('buyingPrice') as string) || undefined,
      compareAtPrice: parseFloat(formData.get('compareAtPrice') as string) || undefined,
      taxRate: parseFloat(formData.get('taxRate') as string) || 0,
      stock: parseInt(formData.get('stock') as string) || 0,
      lowStockThreshold: parseInt(formData.get('lowStockThreshold') as string) || 10,
      maxPurchaseQuantity: parseInt(formData.get('maxPurchaseQuantity') as string) || undefined,
      unit: formData.get('unit'),
      weight: parseFloat(formData.get('weight') as string) || undefined,
      canPurchase: formData.get('canPurchase') === 'on',
      showStockOut: formData.get('showStockOut') === 'on',
      isRefundable: formData.get('isRefundable') === 'on',
      sellByFraction: formData.get('sellByFraction') === 'on',
      isActive: formData.get('isActive') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
      isOnSale: formData.get('isOnSale') === 'on',
      isOrganic: formData.get('isOrganic') === 'on',
      isVegan: formData.get('isVegan') === 'on',
      isGlutenFree: formData.get('isGlutenFree') === 'on',
      tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map((t) => t.trim()) : [],
    };

    try {
      const response = await fetch('/api/admin/food/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/en/admin/food/products');
        router.refresh();
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground mt-2">
            Create a new food or grocery product
          </p>
        </div>
        <Link
          href="/en/admin/food/products"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Camembert de Normandie"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="categoryId" className="text-sm font-medium">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select category</option>
                {/* Categories will be loaded dynamically */}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="sku" className="text-sm font-medium">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., CHE-CAM-001"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="barcode" className="text-sm font-medium">
                Barcode
              </label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., 3250391234567"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="brandId" className="text-sm font-medium">
                Brand
              </label>
              <select
                id="brandId"
                name="brandId"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select brand</option>
                {/* Brands will be loaded dynamically */}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                Unit *
              </label>
              <select
                id="unit"
                name="unit"
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="piece">Piece</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="l">Liter (l)</option>
                <option value="ml">Milliliter (ml)</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="shortDescription" className="text-sm font-medium">
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief product description"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Full Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Detailed product description"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="sellingPrice" className="text-sm font-medium">
                Selling Price (AED) *
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                step="0.01"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="buyingPrice" className="text-sm font-medium">
                Buying Price (AED)
              </label>
              <input
                type="number"
                id="buyingPrice"
                name="buyingPrice"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="compareAtPrice" className="text-sm font-medium">
                Compare at Price (AED)
              </label>
              <input
                type="number"
                id="compareAtPrice"
                name="compareAtPrice"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="taxRate" className="text-sm font-medium">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                step="0.1"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="5"
                defaultValue="5"
              />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="stock" className="text-sm font-medium">
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0"
                defaultValue="0"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lowStockThreshold" className="text-sm font-medium">
                Low Stock Warning
              </label>
              <input
                type="number"
                id="lowStockThreshold"
                name="lowStockThreshold"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="10"
                defaultValue="10"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="maxPurchaseQuantity" className="text-sm font-medium">
                Max Purchase Quantity
              </label>
              <input
                type="number"
                id="maxPurchaseQuantity"
                name="maxPurchaseQuantity"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="No limit"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium">
                Weight (grams)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                step="0.1"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Product Options */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Product Options</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="canPurchase" defaultChecked className="rounded" />
              <span className="text-sm">Can Purchase</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="showStockOut" defaultChecked className="rounded" />
              <span className="text-sm">Show Stock Out</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isRefundable" defaultChecked className="rounded" />
              <span className="text-sm">Refundable</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="sellByFraction" className="rounded" />
              <span className="text-sm">Sell By Fraction (Weight)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isActive" defaultChecked className="rounded" />
              <span className="text-sm font-medium">Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isFeatured" className="rounded" />
              <span className="text-sm font-medium">Featured</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isOnSale" className="rounded" />
              <span className="text-sm">On Sale</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isOrganic" className="rounded" />
              <span className="text-sm">Organic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isVegan" className="rounded" />
              <span className="text-sm">Vegan</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isGlutenFree" className="rounded" />
              <span className="text-sm">Gluten Free</span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Tags & SEO</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., French, Cheese, Gourmet"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/en/admin/food/products"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
