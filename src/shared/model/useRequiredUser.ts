import { useAppSelector } from '../config/store/typedStore';

export function useRequiredUser() {
  const user = useAppSelector((state) => state.session.user);

  if (!user) {
    throw new Error(
      '[useRequiredUser] Called outside of a ProtectedRoute. ' +
        'Ensure all routes that render this component are wrapped in ProtectedRoute.',
    );
  }

  return user;
}
