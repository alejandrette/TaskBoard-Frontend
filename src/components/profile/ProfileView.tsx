import { useAuth } from "@/hooks/useAuth";
import ProfileForm from "./ProfileForm";

export default function ProfileView() {
  const { data } = useAuth()
  return (
    <>
      <ProfileForm data={data} />
    </>
  )
}
