import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

function LoginModal({ onClose, onContinueAsGuest }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create an Account to Save Progress
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Create an account or log in to save your game progress and compete on leaderboards.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/login"
                    className="inline-flex justify-center w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Log In
                  </Link>
                  
                  <Link
                    to="/register"
                    className="inline-flex justify-center w-full rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-blue-50 focus:outline-none"
                  >
                    Create Account
                  </Link>
                  
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={onContinueAsGuest}
                  >
                    Continue as Guest
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LoginModal;
