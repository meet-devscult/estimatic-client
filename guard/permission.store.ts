'use client';

import { PERMISSION, PERMISSIONS } from '@/types/user.type';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
    user_id: string,
    user_name: string,
    email: string,
}

interface PermissionState {
	// State
	permissions: PERMISSIONS | null;

	// Actions
	setPermissions: (permissions: PERMISSIONS) => void;
	clearPermissions: () => void;

	// Permission checkers
	hasPermission: (route: keyof PERMISSIONS, requiredLevel?: PERMISSION) => boolean;
	getPermission: (route: keyof PERMISSIONS) => PERMISSION;
	hasFullAccess: (route: keyof PERMISSIONS) => boolean;
	hasViewOnly: (route: keyof PERMISSIONS) => boolean;
	isRestricted: (route: keyof PERMISSIONS) => boolean;

	// Computed values
	getAllPermissions: () => PERMISSIONS | null;

    // User info
    user: User | null;

    // User actions
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const usePermissionStore = create<PermissionState>()(
	devtools(
		persist(
			(set, get) => ({
			// Initial state
			permissions: null,

			// Actions
			setPermissions: (permissions: PERMISSIONS) => {
				set({
					permissions,
				});
			},

			clearPermissions: () => {
				set({
					permissions: null,
				});
			},

			// Permission checkers
			hasPermission: (
				route: keyof PERMISSIONS,
				requiredLevel?: PERMISSION
			): boolean => {
				const state = get();
				if (!state.permissions) return false;

				const permission = state.permissions[route];

				// If no required level specified, check if not restricted
				if (!requiredLevel) {
					return permission !== PERMISSION.RESTRICTED;
				}

				// Check specific permission level
				return permission === requiredLevel;
			},

			getPermission: (route: keyof PERMISSIONS): PERMISSION => {
				const state = get();
				if (!state.permissions) return PERMISSION.RESTRICTED;
				return state.permissions[route] || PERMISSION.RESTRICTED;
			},

			hasFullAccess: (route: keyof PERMISSIONS): boolean => {
				const state = get();
				if (!state.permissions) return false;
				return state.permissions[route] === PERMISSION.FULL_ACCESS;
			},

			hasViewOnly: (route: keyof PERMISSIONS): boolean => {
				const state = get();
				if (!state.permissions) return false;
				return state.permissions[route] === PERMISSION.VIEW_ONLY;
			},

			isRestricted: (route: keyof PERMISSIONS): boolean => {
				const state = get();
				if (!state.permissions) return true;
				return state.permissions[route] === PERMISSION.RESTRICTED;
			},

			// Computed values
			getAllPermissions: (): PERMISSIONS | null => {
				const state = get();
				return state.permissions;
			},

            // User info
            user: null,

            // User actions
            setUser: (user: User) => {
                set({ user });
            },

            clearUser: () => {
                set({ user: null });
            },
		}),
		{
			name: 'permission-store', // unique name for localStorage
			partialize: (state) => ({
				permissions: state.permissions,
				user: state.user,
			}),
		}
	),
	{ name: 'PermissionStore' }
	)
);

// Custom hook for easier permission management
export const usePermissions = () => {
	const permissions = usePermissionStore((state) => state.permissions);

	const setPermissions = usePermissionStore((state) => state.setPermissions);
	const clearPermissions = usePermissionStore((state) => state.clearPermissions);

	const hasPermission = usePermissionStore((state) => state.hasPermission);
	const getPermission = usePermissionStore((state) => state.getPermission);
	const hasFullAccess = usePermissionStore((state) => state.hasFullAccess);
	const hasViewOnly = usePermissionStore((state) => state.hasViewOnly);
	const isRestricted = usePermissionStore((state) => state.isRestricted);

	const getAllPermissions = usePermissionStore(
		(state) => state.getAllPermissions
	);

    // User info
    const user = usePermissionStore((state) => state.user);

    const setUser = usePermissionStore((state) => state.setUser);
    const clearUser = usePermissionStore((state) => state.clearUser);

	return {
		// State
		permissions,

		// Actions
		setPermissions,
		clearPermissions,

		// Permission checkers
		hasPermission,
		getPermission,
		hasFullAccess,
		hasViewOnly,
		isRestricted,

		// Computed values
		getAllPermissions,

        // User info
        user,
        setUser,
        clearUser
	};
};
