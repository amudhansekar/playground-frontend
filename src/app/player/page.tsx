import SubmitButton from "@/common/components/submit-button/submit-button";
import { getCurrentPlayerServerWithRedirect } from "@/common/util/player-util";
import {
  ageField,
  firstNameField,
  heightField,
  lastNameField,
  weightField,
} from "@/player/model/player-fields";
import savePlayer from "@/player/server-action/save-player";
import { Input } from "@nextui-org/react";
import { redirect } from "next/navigation";

async function NewPlayerPage() {
  const player = await getCurrentPlayerServerWithRedirect();

  if (player !== undefined) {
    redirect(`/player/${player.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="mb-3 text-2xl font-semibold my-5">
        Welcome to Playground
      </h1>
      <h2>Tell us a little bit more about yourself</h2>
      <form action={savePlayer}>
        <Input
          id={firstNameField}
          name={firstNameField}
          isRequired
          label="First Name"
          className="my-5"
        />
        <Input
          id={lastNameField}
          name={lastNameField}
          isRequired
          label="Last Name"
          className="my-5"
        />
        <Input
          id={ageField}
          name={ageField}
          isRequired
          type="number"
          label="Age"
          className="my-5"
        />
        <Input
          id={heightField}
          name={heightField}
          type="number"
          label="Height (cm)"
          className="my-5"
        />
        <Input
          id={weightField}
          name={weightField}
          type="number"
          label="Weight (kg)"
          className="my-5"
        />
        <SubmitButton />
      </form>
    </div>
  );
}

export default NewPlayerPage;
