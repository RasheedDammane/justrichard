import Link from 'next/link';
import { FileQuestion, ArrowLeft, BookOpen } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-xl text-gray-600">
            Sorry, we couldn't find the article you're looking for.
          </p>
        </div>

        {/* Message Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <p className="text-lg text-gray-600 mb-6">
            This article might have been moved, deleted, or the URL might be incorrect.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse All Articles
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Browse by Topic
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/en/blog?category=home-improvement"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Home Improvement
            </Link>
            <Link
              href="/en/blog?category=wellness"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Wellness
            </Link>
            <Link
              href="/en/blog?category=business"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Business
            </Link>
            <Link
              href="/en/blog?category=coaching"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Coaching
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
