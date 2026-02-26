import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Iter "mo:core/Iter";



actor {
  type VisitorEntry = {
    username : Text;
    timestamp : Int;
  };

  var nextId = 0; // Unique identifier for each entry
  let entries = Map.empty<Nat, VisitorEntry>();
  let password = "CUTOUT";

  // Add new visitor entry with unique ID
  public shared ({ caller }) func logVisitor(username : Text) : async () {
    let entry : VisitorEntry = {
      username;
      timestamp = Time.now();
    };
    entries.add(nextId, entry);
    nextId += 1;
  };

  // Retrieve all entries if password matches
  public query ({ caller }) func getVisitorLog(pass : Text) : async ?[VisitorEntry] {
    if (pass == password) {
      ?entries.values().toArray();
    } else {
      null;
    };
  };

  // Clear all entries if password matches
  public shared ({ caller }) func clearVisitorLog(pass : Text) : async Bool {
    if (pass == password) {
      entries.clear();
      nextId := 0; // Reset ID counter
      true;
    } else {
      false;
    };
  };

  // Retrieve the last 50 entries
  public query ({ caller }) func getNotifications() : async [VisitorEntry] {
    let allEntries = entries.values().toArray();
    let entryCount = allEntries.size();

    if (entryCount == 0) {
      return [];
    };

    let start = if (entryCount > 50) { entryCount - 50 } else { 0 };
    if (entryCount > start) {
      allEntries.sliceToArray(start, entryCount);
    } else {
      [];
    };
  };
};
