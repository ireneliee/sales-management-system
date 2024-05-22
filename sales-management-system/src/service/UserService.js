import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const usersCollection = collection(db, 'user');

const UserService = {
  async getUsers() {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getAllSales() {
    const q = query(usersCollection, where('role', '==', 'SALES'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getUserByGmail(gmail) {
    const q = query(usersCollection, where('gmail', '==', gmail));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    } else {
      throw new Error('User not found');
    }
  },

  async addUser(user) {
    const newUser = await addDoc(usersCollection, user);
    return { id: newUser.id, ...user };
  },

  async updateUser(id, updatedData) {
    const userDoc = doc(usersCollection, id);
    await updateDoc(userDoc, updatedData);
    return { id, ...updatedData };
  },

  async deleteUser(id) {
    const userDoc = doc(usersCollection, id);
    await deleteDoc(userDoc);
  },

  async authenticateNonAdmin(gmail, code) {
    // TODO: add this logic later
    return true;
  }
};

export default UserService;