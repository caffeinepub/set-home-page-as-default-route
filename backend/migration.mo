import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type VisitorEntry = {
    username : Text;
    timestamp : Int;
  };

  type OldActor = {
    entries : [VisitorEntry];
    password : Text;
  };

  type NewActor = {
    entries : Map.Map<Nat, VisitorEntry>;
    nextId : Nat;
    password : Text;
  };

  public func run(old : OldActor) : NewActor {
    let entries = Map.fromIter<Nat, VisitorEntry>(
      old.entries.enumerate(),
    );
    {
      entries;
      nextId = old.entries.size();
      password = "CUTOUT";
    };
  };
};
