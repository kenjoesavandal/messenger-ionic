import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Home.css";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  useCallStateHooks,
  User,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiU2F0ZWxlX1NoYW4iLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NhdGVsZV9TaGFuIiwiaWF0IjoxNzIwNzE0NDgwLCJleHAiOjE3MjEzMTkyODV9.UjFu1GnL4zjd55Z_1ImBu7LytcwW5xSXNnJQlhtnr6o";
const userId = "Satele_Shan";
const callId = "WJhrtcqyUY23";

// set up the user object
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <MyUILayout />
            </StreamCall>
          </StreamVideo>
      </IonContent>
    </IonPage>
  );
};

export default Home;

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};