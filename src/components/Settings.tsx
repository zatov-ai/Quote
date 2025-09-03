import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Users, 
  Package, 
  FileText, 
  Truck, 
  Shield, 
  UserCheck,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface SettingsProps {}

type SettingsSection = 
  | 'account' 
  | 'address-book' 
  | 'distribution-list' 
  | 'product-manager' 
  | 'package-manager' 
  | 'invoices' 
  | 'carriers' 
  | 'roles' 
  | 'users';

export function Settings({}: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [isEditing, setIsEditing] = useState(false);

  const settingsMenu = [
    {
      id: 'account' as SettingsSection,
      title: 'Account',
      icon: <User className="w-5 h-5" />,
      description: 'Manage your account settings and preferences'
    },
    {
      id: 'address-book' as SettingsSection,
      title: 'Address Book',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Manage shipping addresses and locations'
    },
    {
      id: 'distribution-list' as SettingsSection,
      title: 'Distribution List',
      icon: <Users className="w-5 h-5" />,
      description: 'Manage email distribution lists'
    },
    {
      id: 'product-manager' as SettingsSection,
      title: 'Product Manager',
      icon: <Package className="w-5 h-5" />,
      description: 'Manage your product catalog'
    },
    {
      id: 'package-manager' as SettingsSection,
      title: 'Package Manager',
      icon: <Package className="w-5 h-5" />,
      description: 'Manage package types and dimensions'
    },
    {
      id: 'invoices' as SettingsSection,
      title: 'Invoices',
      icon: <FileText className="w-5 h-5" />,
      description: 'View and manage invoices'
    },
    {
      id: 'carriers' as SettingsSection,
      title: 'Carriers',
      icon: <Truck className="w-5 h-5" />,
      description: 'Manage carrier preferences'
    },
    {
      id: 'roles' as SettingsSection,
      title: 'Roles',
      icon: <Shield className="w-5 h-5" />,
      description: 'Manage user roles and permissions'
    },
    {
      id: 'users' as SettingsSection,
      title: 'Users',
      icon: <UserCheck className="w-5 h-5" />,
      description: 'Manage team members and access'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings />;
      case 'address-book':
        return <AddressBookSettings />;
      case 'distribution-list':
        return <DistributionListSettings />;
      case 'product-manager':
        return <ProductManagerSettings />;
      case 'package-manager':
        return <PackageManagerSettings />;
      case 'invoices':
        return <InvoicesSettings />;
      case 'carriers':
        return <CarriersSettings />;
      case 'roles':
        return <RolesSettings />;
      case 'users':
        return <UsersSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Settings Menu */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
        
        <div className="space-y-2">
          {settingsMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-left ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}

// Account Settings Component
function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@zatov.ai',
    company: 'Zatov AI',
    phone: '+1 (555) 123-4567',
    timezone: 'America/Toronto',
    currency: 'CAD',
    language: 'English'
  });

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h3>
        <p className="text-gray-600">Manage your personal account information and preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({...formData, timezone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/Toronto">Eastern Time (Toronto)</option>
              <option value="America/Vancouver">Pacific Time (Vancouver)</option>
              <option value="America/New_York">Eastern Time (New York)</option>
              <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="USD">US Dollar (USD)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Address Book Settings Component
function AddressBookSettings() {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Main Office',
      company: 'Zatov AI',
      address: '123 Business St',
      city: 'Toronto',
      state: 'ON',
      zipCode: 'M5V 3A8',
      country: 'Canada',
      type: 'Business'
    },
    {
      id: '2',
      name: 'Warehouse',
      company: 'Zatov AI',
      address: '456 Industrial Ave',
      city: 'Mississauga',
      state: 'ON',
      zipCode: 'L5T 2B1',
      country: 'Canada',
      type: 'Warehouse'
    }
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Address Book</h3>
          <p className="text-gray-600">Manage your shipping addresses and locations</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{address.name}</h4>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mt-1">
                  {address.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-medium text-gray-900">{address.company}</p>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Distribution List Settings Component
function DistributionListSettings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Distribution Lists</h3>
          <p className="text-gray-600">Manage email distribution lists for notifications</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create List</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Distribution Lists</h4>
        <p className="text-gray-600 mb-4">Create distribution lists to manage email notifications</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Create Your First List
        </button>
      </div>
    </div>
  );
}

// Product Manager Settings Component
function ProductManagerSettings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Manager</h3>
          <p className="text-gray-600">Manage your product catalog and specifications</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Products</h4>
        <p className="text-gray-600 mb-4">Add products to streamline your shipping process</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Add Your First Product
        </button>
      </div>
    </div>
  );
}

// Package Manager Settings Component
function PackageManagerSettings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Package Manager</h3>
          <p className="text-gray-600">Manage package types and standard dimensions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Package Type</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Package Types</h4>
        <p className="text-gray-600 mb-4">Define standard package types for faster quoting</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Create Package Type
        </button>
      </div>
    </div>
  );
}

// Invoices Settings Component
function InvoicesSettings() {
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Invoices</h3>
        <p className="text-gray-600">View and manage your invoices and billing</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Invoices</h4>
        <p className="text-gray-600">Your invoices will appear here once you start shipping</p>
      </div>
    </div>
  );
}

// Carriers Settings Component
function CarriersSettings() {
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Carrier Preferences</h3>
        <p className="text-gray-600">Manage your preferred carriers and settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Carrier Preferences</h4>
        <p className="text-gray-600">Set up carrier preferences to get better rates</p>
      </div>
    </div>
  );
}

// Roles Settings Component
function RolesSettings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Roles & Permissions</h3>
          <p className="text-gray-600">Manage user roles and access permissions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Role</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Default Roles Only</h4>
        <p className="text-gray-600">Create custom roles to manage team permissions</p>
      </div>
    </div>
  );
}

// Users Settings Component
function UsersSettings() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Members</h3>
          <p className="text-gray-600">Manage team members and their access</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Invite User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-4 p-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">DU</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Demo User</h4>
            <p className="text-sm text-gray-600">demo@zatov.ai</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
}