// import React from 'react';

// function DeleteModal({ onCancel, onConfirm }) {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>Are you sure you want to delete this plan?</h3>
//         <p>This action cannot be undone.</p>
//         <button onClick={onCancel}>Cancel</button>
//         <button onClick={onConfirm} style={{ backgroundColor: 'red', color: 'white' }}>
//           Confirm Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DeleteModal;
import React from 'react';

function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Are you sure you want to delete this plan?
        </h3>
        <p className="text-center text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
