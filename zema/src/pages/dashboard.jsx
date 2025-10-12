import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../utils/firebase"; 
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);

  // Track logged in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Load user collections
  useEffect(() => {
    if (!user) return;
    const fetchCollections = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setCollections(userSnap.data().collections || []);
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, [user]);

  // Load last 3 uploads across all collections
  useEffect(() => {
    if (!user || collections.length === 0) return;

    const fetchRecentUploads = async () => {
      try {
        let uploads = [];
        for (const col of collections) {
          const q = query(
            collection(db, "users", user.uid, col),
            orderBy("createdAt", "desc"),
            limit(3)
          );
          const snap = await getDocs(q);
          snap.forEach((docSnap) => {
            uploads.push({ id: docSnap.id, collection: col, ...docSnap.data() });
          });
        }

        uploads.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setRecentUploads(uploads.slice(0, 3));
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    };

    fetchRecentUploads();
  }, [user, collections]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-5xl mx-auto space-y-10">

        {user && (
          <h1 className="text-3xl font-bold text-center">
            Welcome, {user.displayName || "User"}
          </h1>
        )}

        <div className="flex justify-center gap-6">
          <Link
            to="/scanner"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Scan New Image
          </Link>
          <Link
            to="/log"
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition"
          >
            View Collections
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Collections</h2>
          {collections.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {collections.map((col) => (
                <Link
                  key={col}
                  to={`/collections/${col}`}
                  className="card flex items-center justify-center w-40 h-24 bg-white border rounded-lg shadow hover:shadow-md transition font-medium text-lg"
                >
                  {col}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No collections yet.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center">Recent Uploads</h2>
          {recentUploads.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {recentUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="w-40 bg-white border rounded-lg shadow p-3 flex flex-col items-center transition hover:shadow-md"
                >
                  {upload.image && (
                    <img
                      src={upload.image}
                      alt="upload preview"
                      className="w-32 h-32 object-cover rounded mb-2"
                    />
                  )}
                  <p className="text-sm font-medium">{upload.collection}</p>
                  <p className="text-sm">Prediction: <span className="font-semibold">{upload.prediction}</span></p>
                  {upload.createdAt && (
                    <p className="text-xs text-gray-500">
                      {new Date(upload.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No uploads yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
