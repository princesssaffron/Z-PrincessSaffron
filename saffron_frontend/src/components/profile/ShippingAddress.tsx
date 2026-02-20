import { useState } from "react";
import {  Loader2 } from "lucide-react";
import { Country, State, City } from "country-state-city";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile, ProfileUpdate } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button"; // ✅ connected to Button.tsx

interface ShippingAddressProps {
  profile: Profile | null;
  onUpdate: (updates: ProfileUpdate) => Promise<boolean>;
}

const ShippingAddress = ({ profile, onUpdate }: ShippingAddressProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    shipping_address: profile?.shipping_address || "",
    shipping_area: profile?.shipping_area || "",
    shipping_city: profile?.shipping_city || "",
    shipping_state: profile?.shipping_state || "",
    shipping_pincode: profile?.shipping_pincode || "",
    shipping_country: profile?.shipping_country || "",
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
    if (success) setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      shipping_address: profile?.shipping_address || "",
      shipping_area: profile?.shipping_area || "",
      shipping_city: profile?.shipping_city || "",
      shipping_state: profile?.shipping_state || "",
      shipping_pincode: profile?.shipping_pincode || "",
      shipping_country: profile?.shipping_country || "",
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
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-10">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl tracking-[0.30em] text-royal-purple uppercase">
            Shipping Address
          </h2>
        </div>

        {/* ===== EDIT BUTTON ===== */}
        {!isEditing && (
          <div className="flex justify-center mb-10">
            <Button onClick={() => setIsEditing(true)}>
              {hasAddress ? "Edit Address" : "Add Address"}
            </Button>
          </div>
        )}

        {/* ===== FORM ===== */}
        {isEditing ? (
          <div className="w-full max-w-3xl mx-auto">

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">

              {/* ADDRESS */}
              <div className="space-y-3 md:col-span-2">
                <Label>House / Flat / Street</Label>
                <Input
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleInputChange}
                  className="rounded-full h-11 px-6"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label>Area / Landmark</Label>
                <Input
                  name="shipping_area"
                  value={formData.shipping_area}
                  onChange={handleInputChange}
                  className="rounded-full h-11 px-6"
                />
              </div>

              {/* COUNTRY */}
              <div className="space-y-3">
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
                  className="w-full rounded-full h-11 px-6 border border-border bg-background"
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATE */}
              <div className="space-y-3">
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
                  className="w-full rounded-full h-11 px-6 border border-border bg-background"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* CITY */}
              <div className="space-y-3">
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
                  className="w-full rounded-full h-11 px-6 border border-border bg-background"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PINCODE */}
              <div className="space-y-3">
                <Label>Pincode</Label>
                <Input
                  name="shipping_pincode"
                  value={formData.shipping_pincode}
                  onChange={handleInputChange}
                  className="rounded-full h-11 px-6"
                />
              </div>

            </div>

            {/* ===== BUTTONS CENTERED ===== */}
            <div className="flex justify-center gap-6 mt-12">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Address"
                )}
              </Button>

              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </div>

          </div>
        ) : hasAddress ? (
          <div className="text-center text-foreground leading-relaxed space-y-2">
            <p>{profile?.shipping_address}</p>
            {profile?.shipping_area && <p>{profile.shipping_area}</p>}
            <p>
              {profile?.shipping_city}, {profile?.shipping_state} -{" "}
              {profile?.shipping_pincode}
            </p>
            <p>{profile?.shipping_country}</p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No address saved yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
