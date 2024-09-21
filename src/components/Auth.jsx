const AuthenticatedView = ({ onLogout }) => {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-purple-200 text-3xl mb-4">Welcome Back!</h2>
        <button
          onClick={onLogout}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  };
  