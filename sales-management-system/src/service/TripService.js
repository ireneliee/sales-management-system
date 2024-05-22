import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const tripCollection = collection(db, 'salesTrip');

const TripService = {
  async getTripServices() {
    const querySnapshot = await getDocs(tripCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async addTrip(trip) {
    const newTrip = await addDoc(tripCollection, trip);
    return { id: newTrip.id, ...trip };
  },
  async updateTrip(id, updatedData) {
    const tripDoc = doc(tripCollection, id);
    await updateDoc(tripDoc, updatedData);
    return { id, ...updatedData };
  },
  async deleteTrip(id) {
    const tripDoc = doc(tripCollection, id);
    await deleteDoc(tripDoc);
  },
  async getTripsByGmail(gmail) {
    const q = query(tripCollection, where('gmail', '==', gmail));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};

export default TripService;