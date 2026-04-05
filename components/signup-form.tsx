'use client';

import { FormState, subscribe } from 'app/actions/subscribe';
import { useActionState } from 'react';

const initialState: FormState = {};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);

  return (
    <div className="w-full max-w-md mt-8">
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-grow px-4 py-3 rounded-xl border border-neutral-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all text-neutral-900 placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 disabled:opacity-50 transition-all whitespace-nowrap"
          >
            {isPending ? 'Signing up...' : 'Keep me updated'}
          </button>
        </div>

        {state.error && (
          <p className="text-red-500 text-sm font-medium">{state.error}</p>
        )}

        {state.success && (
          <p className="text-green-600 text-sm font-medium">{state.success}</p>
        )}
      </form>
    </div>
  );
}
