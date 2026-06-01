import { UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  changeAdminPassword,
  getAllAdmins,
  getAdminProfile,
  sendAdminCreationOtp,
  updateAdminProfile,
  verifyAdminCreationOtp,
} from "../../services/adminService";

function formatJoinedDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialCreateAdminForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

export default function AdminSettings() {
  const { updateUser, user } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [createAdminForm, setCreateAdminForm] = useState(initialCreateAdminForm);
  const [profileFeedback, setProfileFeedback] = useState({ type: "", message: "" });
  const [passwordFeedback, setPasswordFeedback] = useState({ type: "", message: "" });
  const [createAdminFeedback, setCreateAdminFeedback] = useState({ type: "", message: "" });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [createAdminStep, setCreateAdminStep] = useState(1);

  useEffect(() => {
    const fetchAdminSettings = async () => {
      try {
        setIsLoading(true);
        const [profileResponse, adminsResponse] = await Promise.all([
          getAdminProfile(),
          getAllAdmins(),
        ]);
        const adminData = profileResponse.admin;
        setAdmin(adminData);
        setAdmins(adminsResponse.admins || []);
        setProfileForm({
          name: adminData.name || "",
          email: adminData.email || "",
          phone: adminData.phone || "",
        });
      } catch (error) {
        setProfileFeedback({
          type: "error",
          message: error.response?.data?.message || "Unable to load admin settings",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminSettings();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileFeedback({ type: "", message: "" });
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordFeedback({ type: "", message: "" });
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const handleCreateAdminChange = (event) => {
    const { name, value } = event.target;
    setCreateAdminFeedback({ type: "", message: "" });
    setCreateAdminForm((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSavingProfile(true);
      const response = await updateAdminProfile(profileForm);
      setAdmin(response.admin);
      updateUser(response.admin);
      setAdmins((current) =>
        current.map((item) => (item.id === response.admin.id ? response.admin : item))
      );
      setProfileForm({
        name: response.admin.name || "",
        email: response.admin.email || "",
        phone: response.admin.phone || "",
      });
      setProfileFeedback({
        type: "success",
        message: response.message || "Admin profile updated successfully",
      });
    } catch (error) {
      setProfileFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update admin profile",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "New password and confirm password do not match",
      });
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await changeAdminPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm(initialPasswordForm);
      setPasswordFeedback({
        type: "success",
        message: response.message || "Password updated successfully",
      });
    } catch (error) {
      setPasswordFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update password",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCreateAdminSubmit = async (event) => {
    event.preventDefault();

    if (createAdminStep === 1) {
      if (createAdminForm.password !== createAdminForm.confirmPassword) {
        setCreateAdminFeedback({
          type: "error",
          message: "Password and confirm password do not match",
        });
        return;
      }

      try {
        setIsCreatingAdmin(true);
        const response = await sendAdminCreationOtp({
          name: createAdminForm.name,
          email: createAdminForm.email,
          phone: createAdminForm.phone,
          password: createAdminForm.password,
        });

        setCreateAdminStep(2);
        setCreateAdminFeedback({
          type: "success",
          message:
            response.message ||
            `OTP sent successfully to ${createAdminForm.email}. Verify it to create the admin.`,
        });
      } catch (error) {
        setCreateAdminFeedback({
          type: "error",
          message: error.response?.data?.message || "Unable to send OTP for new admin",
        });
      } finally {
        setIsCreatingAdmin(false);
      }

      return;
    }

    try {
      setIsCreatingAdmin(true);
      const response = await verifyAdminCreationOtp({
        email: createAdminForm.email,
        otp: createAdminForm.otp,
      });
      setAdmins((current) => [response.admin, ...current]);
      setCreateAdminForm(initialCreateAdminForm);
      setCreateAdminStep(1);
      setCreateAdminFeedback({
        type: "success",
        message:
          response.message ||
          `New admin created successfully for ${response.admin?.email || "the provided email"}`,
      });
    } catch (error) {
      setCreateAdminFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to verify OTP and create admin",
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleResetCreateAdmin = () => {
    setCreateAdminForm(initialCreateAdminForm);
    setCreateAdminFeedback({ type: "", message: "" });
    setCreateAdminStep(1);
  };

  const renderFeedback = (feedback) => {
    if (!feedback.message) {
      return null;
    }

    return (
      <div
        className={`border px-4 py-3 text-sm ${
          feedback.type === "error"
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        {feedback.message}
      </div>
    );
  };

  if (isLoading) {
    return <div className="bg-white p-6 text-slate-600 shadow-sm">Loading settings...</div>;
  }

  const currentAdmin = admin || user;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage admin profile, login credentials, and create additional admin accounts.
        </p>
      </div>

      <section className="grid gap-5">
        <div className="border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-[#a94672]">
                <UserCog size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">All Admins</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {admins.length} admin account{admins.length === 1 ? "" : "s"} currently available.
                </p>
              </div>
            </div>
            <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Signed in as <span className="font-semibold">{currentAdmin?.email || "admin"}</span>
            </div>
          </div>

          <div className="mt-6 overflow-hidden border border-rose-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
                <thead className="bg-rose-500 text-white">
                  <tr>
                    <th className="border-b border-r border-rose-200 p-4 text-left font-semibold">Admin Name</th>
                    <th className="border-b border-r border-rose-200 p-4 text-left font-semibold">Email</th>
                    <th className="border-b border-r border-rose-200 p-4 text-left font-semibold">Mobile Number</th>
                    <th className="border-b border-r border-rose-200 p-4 text-left font-semibold">Role</th>
                    <th className="border-b border-r border-rose-200 p-4 text-left font-semibold">Joined On</th>
                    <th className="border-b border-rose-200 p-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length ? (
                    admins.map((item) => (
                      <tr key={item.id} className="even:bg-rose-50/40">
                        <td className="border-t border-r border-rose-100 p-4 font-semibold text-slate-900">{item.name}</td>
                        <td className="border-t border-r border-rose-100 p-4 text-slate-600">{item.email}</td>
                        <td className="border-t border-r border-rose-100 p-4 text-slate-600">{item.phone || "Not available"}</td>
                        <td className="border-t border-r border-rose-100 p-4">
                          <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
                            {item.role || "admin"}
                          </span>
                        </td>
                        <td className="border-t border-r border-rose-100 p-4 text-slate-600">{formatJoinedDate(item.createdAt)}</td>
                        <td className="border-t border-rose-100 p-4">
                          <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                            Active Admin
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-500">
                        No admin accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Admin Details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Update admin name, email address, and mobile number.
          </p>

          <form onSubmit={handleProfileSubmit} className="mt-6 grid gap-4">
            {renderFeedback(profileFeedback)}

            <Field label="Full Name">
              <input
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className="input-base"
                placeholder="Admin name"
                required
              />
            </Field>

            <Field label="Email Address">
              <input
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="input-base"
                placeholder="admin@example.com"
                required
              />
            </Field>

            <Field label="Mobile Number">
              <input
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="input-base"
                placeholder="9876543210"
                required
              />
            </Field>

            <button
              type="submit"
              disabled={isSavingProfile}
              className="rounded-2xl bg-[#c45a8d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a94672] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </section>

        <section className="border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
          <p className="mt-1 text-sm text-slate-500">
            Use your current password to set a new secure password.
          </p>

          <form onSubmit={handlePasswordSubmit} className="mt-6 grid gap-4">
            {renderFeedback(passwordFeedback)}

            <Field label="Current Password">
              <div className="space-y-2">
                <input
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="input-base"
                  placeholder="Enter current password"
                  required
                />
                <p className="text-xs text-slate-500">
                  If you donnot remember current password{" "}
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-primary transition hover:underline"
                  >
                    click here
                  </Link>
                </p>
              </div>
            </Field>

            <Field label="New Password">
              <input
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="input-base"
                placeholder="Enter new password"
                required
              />
            </Field>

            <Field label="Confirm New Password">
              <input
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="input-base"
                placeholder="Confirm new password"
                required
              />
            </Field>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>
      </div>

      <section className="border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Create New Admin</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add another admin account directly from the dashboard.
        </p>

        <form onSubmit={handleCreateAdminSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">{renderFeedback(createAdminFeedback)}</div>

          <Field label="Admin Name">
            <input
              name="name"
              value={createAdminForm.name}
              onChange={handleCreateAdminChange}
              className="input-base"
              placeholder="New admin name"
              required
            />
          </Field>

          <Field label="Admin Email">
            <input
              name="email"
              type="email"
              value={createAdminForm.email}
              onChange={handleCreateAdminChange}
              className="input-base"
              placeholder="new-admin@example.com"
              required
            />
          </Field>

          <Field label="Mobile Number">
            <input
              name="phone"
              value={createAdminForm.phone}
              onChange={handleCreateAdminChange}
              className="input-base"
              placeholder="9876543210"
              required
            />
          </Field>

          <Field label="Password">
            <input
              name="password"
              type="password"
              value={createAdminForm.password}
              onChange={handleCreateAdminChange}
              className="input-base"
              placeholder="Create password"
              required
            />
          </Field>

          <Field label="Confirm Password">
            <input
              name="confirmPassword"
              type="password"
              value={createAdminForm.confirmPassword}
              onChange={handleCreateAdminChange}
              className="input-base"
              placeholder="Confirm password"
              required
            />
          </Field>

          {createAdminStep === 2 ? (
            <Field label="Email OTP">
              <input
                name="otp"
                value={createAdminForm.otp}
                onChange={handleCreateAdminChange}
                className="input-base"
                placeholder="Enter OTP sent to admin email"
                required
              />
            </Field>
          ) : null}

          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isCreatingAdmin}
                className="rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCreatingAdmin
                  ? createAdminStep === 1
                    ? "Sending OTP..."
                    : "Verifying OTP..."
                  : createAdminStep === 1
                    ? "Send OTP"
                    : "Verify OTP & Create Admin"}
              </button>

              {createAdminStep === 2 ? (
                <button
                  type="button"
                  onClick={handleResetCreateAdmin}
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Edit Details
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}


