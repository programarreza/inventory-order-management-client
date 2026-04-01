import { selectCurrentUser } from "../lib/Redux/features/auth/authSlice";
import { useGetSingleMemberQuery } from "../lib/Redux/features/user/userApi";
import { useAppSelector } from "../lib/Redux/hooks";

const useLoggedUser = () => {
  const loggedUser = useAppSelector(selectCurrentUser);

  // Only make the API call if we have a valid email
  const { data } = useGetSingleMemberQuery(loggedUser?.email || "", {
    skip: !loggedUser?.email,
  });

  return data?.data;
};

export default useLoggedUser;
