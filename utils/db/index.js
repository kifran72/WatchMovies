import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

const AddEvent = async (user, infoEvent) => {
  try {
    await addDoc(collection(db, "events"), {
      // id: user.uid,
      // email: user.email,
      // displayName: user.displayName,
      start: infoEvent.dateStr,
      title: infoEvent.title,
      allDay: infoEvent.allDay,
      display: infoEvent.display,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getEvents = async () => {
  const events = [];
  const db = getFirestore();

  const querySnapshot = await getDocs(collection(db, "events"));
  querySnapshot.forEach((doc) => {
    events.push(doc.data());
  });
  return events;
};

export { AddEvent, getEvents };
