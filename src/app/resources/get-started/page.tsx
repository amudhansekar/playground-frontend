function GetStartedPage() {
  return (
    <div className="flex flex-col items-center justify-between m-24">
      <h1 className="text-3xl font-semibold">Get Started With Playground</h1>

      <ol>
        <li className="m-10">
          <h2 className="text-2xl font-semibold">Create Your Player</h2>
          <p>Create your player to be able to take part in games</p>
        </li>
        <li className="m-10">
          <h2 className="text-2xl font-semibold">Find Your Player ID</h2>
          <p>This is available on your player&apos;s detail page</p>
        </li>
        <li className="m-10">
          <h2 className="text-2xl font-semibold">Find Some Friends</h2>
          <p>The hardest part</p>
        </li>
        <li className="m-10">
          <h2 className="text-2xl font-semibold">Create a Game</h2>
          <ol>
            <li>Choose the sport</li>
            <li>Pick a start date</li>
            <li>Add players to the different teams using the player ID</li>
            <li>Save the game</li>
          </ol>
        </li>
      </ol>
    </div>
  );
}

export default GetStartedPage;
