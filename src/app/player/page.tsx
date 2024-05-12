import SubmitButton from "@/common/components/submit-button/submit-button";
import { getCurrentPlayerServerWithRedirect } from "@/common/util/player-util";
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from "@/player/model/player-fields";
import savePlayer from "@/player/server-action/save-player";
import { Input } from "@nextui-org/react";

async function NewPlayerPage() {
  const player = await getCurrentPlayerServerWithRedirect();

  return (
    <div className="flex flex-col items-center justify-between m-24">
      <h1 className="mb-3 text-2xl font-semibold">Welcome to Playground</h1>
      <h2>Tell us a little bit more about yourself</h2>
      <form action={savePlayer}>
        <input hidden id={idField} name={idField} value={player?.id} readOnly />
        <Input
          id={firstNameField}
          name={firstNameField}
          isRequired
          label="First Name"
          className="my-5"
          defaultValue={player?.firstName}
        />
        <Input
          id={lastNameField}
          name={lastNameField}
          isRequired
          label="Last Name"
          className="my-5"
          defaultValue={player?.lastName}
        />
        <Input
          id={ageField}
          name={ageField}
          isRequired
          type="number"
          label="Age"
          className="my-5"
          defaultValue={
            player?.age === undefined ? undefined : player.age.toString()
          }
        />
        <Input
          id={heightField}
          name={heightField}
          type="number"
          label="Height (cm)"
          className="my-5"
          defaultValue={
            player?.height === undefined ? undefined : player.height.toString()
          }
        />
        <Input
          id={weightField}
          name={weightField}
          type="number"
          label="Weight (kg)"
          className="my-5"
          defaultValue={
            player?.weight === undefined ? undefined : player.weight.toString()
          }
        />
        <SubmitButton />
      </form>
    </div>
  );
}

export default NewPlayerPage;
