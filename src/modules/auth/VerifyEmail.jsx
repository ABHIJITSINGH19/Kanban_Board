import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, XCircle, ArrowLeft, Mail } from "lucide-react";
import {
  verifyEmail,
  clearError,
  clearEmailVerificationSuccess,
  selectAuthLoading,
  selectAuthError,
  selectEmailVerificationSuccess,
  selectEmailVerificationMessage,
} from "../../store/slices/authSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const emailVerificationSuccess = useSelector(selectEmailVerificationSuccess);
  const emailVerificationMessage = useSelector(selectEmailVerificationMessage);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearEmailVerificationSuccess());

    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (emailVerificationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [emailVerificationSuccess, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8">
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Verifying Email...
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Please wait while we verify your email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (emailVerificationSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8">
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center gap-3">
              <CheckCircle className="text-green-600" size={48} />
              <div>
                <p className="text-lg font-semibold text-green-800">
                  Email Verified Successfully!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {emailVerificationMessage ||
                    "Your email has been verified successfully."}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Redirecting to login page...
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} />
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center gap-3">
              <XCircle className="text-red-600" size={48} />
              <div>
                <p className="text-lg font-semibold text-red-800">
                  Verification Failed
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {error || "The verification link is invalid or has expired."}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Please request a new verification email or contact support.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full bg-blue-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-700 shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                Register Again
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
