"use client";
import { Container } from "@/components/Container";
import { ModalBio } from "@/components/ModalBio";
import { TableProfile } from "@/components/TableProfile";
import React, { useEffect, useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Profile = ({ params }) => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      fetch("http://localhost:3000/usuarios?userName=" + params.userName)
        .then((res) => res.json())
        .then((res) => {
          setProfile(res[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <main>
      <Container className="flex-row min-h-max max-md:flex-col">
        <div className="flex flex-col items-start md:w-[30vw] max-md:items-center max-md:justify-center gap-4 ">
          <img
            className="w-full max-md:size-32 rounded-xl"
            src={profile && profile.imagem}
            alt="Foto de perfil do usuário"
          />

          <div className="flex w-full flex-col gap-2 max-md:items-center">
            <h1>@{profile && profile.userName}</h1>
            <a
              target="_blank"
              className="w-full flex justify-center"
              href={profile && profile.urlGitHub}
            >
              <GitHubLogoIcon className="size-12 py-2 bg-primary text-background rounded-lg w-full max-w-sm flex items-center justify-center" />
            </a>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="w-full rounded h-auto flex justify-center">
              <p>{profile ? profile.bio : ""}</p>
            </div>

            {profile &&
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).id == profile.id && (
                <ModalBio getProfile={getProfile} user={profile && profile} />
              )}
          </div>
        </div>

        <div className="flex justify-end w-full">
          {profile && <TableProfile profile={profile} />}
        </div>
      </Container>
    </main>
  );
};

export default Profile;
