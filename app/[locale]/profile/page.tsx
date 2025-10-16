import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function ProfilePage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/auth/login`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      addresses: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{user.name || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{user.phone || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <p className="text-gray-900">{user.role}</p>
              </div>
            </div>
            <button className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Edit Profile
            </button>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Addresses</h2>
              <button className="text-primary-600 hover:text-primary-700">+ Add Address</button>
            </div>
            {user.addresses.length === 0 ? (
              <p className="text-gray-500">No addresses saved</p>
            ) : (
              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{address.label}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {address.street}, {address.building}
                          {address.apartment && `, ${address.apartment}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.city}, {address.region}, {address.country}
                        </div>
                      </div>
                      {address.isDefault && (
                        <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="text-primary-600 hover:text-primary-700">
                Change Password
              </button>
              <br />
              <button className="text-red-600 hover:text-red-700">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
