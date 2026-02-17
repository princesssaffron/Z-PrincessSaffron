import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Country, State, City } from "country-state-city";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Profile, ProfileUpdate } from "@/hooks/useProfile";

interface ShippingAddressProps {
  profile: Profile | null;
  onUpdate: (updates: ProfileUpdate) => Promise<boolean>;
}

const ShippingAddress = ({ profile, onUpdate }: ShippingAddressProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    shipping_address: "",
    shipping_area: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    shipping_country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onUpdate(formData);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      shipping_address: "",
      shipping_area: "",
      shipping_city: "",
      shipping_state: "",
      shipping_pincode: "",
      shipping_country: "",
    });
    setIsEditing(false);
  };

  const hasAddress = profile?.shipping_address && profile?.shipping_city;

  const selectedCountry = Country.getAllCountries().find(
    (c) => c.name === formData.shipping_country
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find(
    (s) => s.name === formData.shipping_state
  );

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(
          selectedCountry.isoCode,
          selectedState.isoCode
        )
      : [];

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-royal-purple flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Shipping Address
        </h2>

        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFormData({
                shipping_address: "",
                shipping_area: "",
                shipping_city: "",
                shipping_state: "",
                shipping_pincode: "",
                shipping_country: "",
              });
              setIsEditing(true);
            }}
            className="text-gold border-gold hover:bg-gold/10"
          >
            {hasAddress ? "Edit" : "Add Address"}
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <Label>House / Flat / Street</Label>
              <Input
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleInputChange}
                placeholder="123, Main Street"
              />
            </div>

            {/* Area */}
            <div className="space-y-2 md:col-span-2">
              <Label>Area / Landmark</Label>
              <Input
                name="shipping_area"
                value={formData.shipping_area}
                onChange={handleInputChange}
                placeholder="Near City Center Mall"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label>Country</Label>
              <select
                value={formData.shipping_country}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_country: e.target.value,
                    shipping_state: "",
                    shipping_city: "",
                  }))
                }
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <Label>State</Label>
              <select
                value={formData.shipping_state}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_state: e.target.value,
                    shipping_city: "",
                  }))
                }
                disabled={!selectedCountry}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label>City</Label>
              <select
                value={formData.shipping_city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shipping_city: e.target.value,
                  }))
                }
                disabled={!selectedState}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div className="space-y-2">
              <Label>Pincode</Label>
              <Input
                name="shipping_pincode"
                value={formData.shipping_pincode}
                onChange={handleInputChange}
                placeholder="600001"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gold text-royal-purple-dark hover:bg-gold-light"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </Button>

            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : hasAddress ? (
        <div className="text-foreground">
          <p>{profile.shipping_address}</p>
          {profile.shipping_area && <p>{profile.shipping_area}</p>}
          <p>
            {profile.shipping_city}, {profile.shipping_state} -{" "}
            {profile.shipping_pincode}
          </p>
          <p>{profile.shipping_country}</p>
        </div>
      ) : (
        <p className="text-muted-foreground">
          No address saved yet. Add your shipping address for faster checkout.
        </p>
      )}
    </div>
  );
};

export default ShippingAddress;
