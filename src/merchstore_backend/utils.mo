import Text "mo:base/Text";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Types "types";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import List "mo:base/List";
import Iter "mo:base/Iter";

module {
func process_character(char : Char) : Char {
    let unicode_value = Char.toNat32(char); // converted to nat32

    if (unicode_value >= 97 and unicode_value <= 122) {
        // ascii lowercase
        // leave as is
        return (Char.fromNat32(unicode_value));
    };
    if (unicode_value >= 65 and unicode_value <= 90) {
        // lowercase
        return (Char.fromNat32(unicode_value + 32));
    };
    if (unicode_value >= 48 and unicode_value <= 57) {
        // keep digits
        return Char.fromNat32(unicode_value);
    };
    if (unicode_value == 32 or unicode_value == 45) {
        // spaces to "-" and keep "-"
        return Char.fromNat32(45);
    };
    // remove everything else
    return Char.fromNat32(0);
};


    public func slugify(word : Text) : Text {
        var slug : Text = "";
        var char : Char = '\u{0}';
        for (c in word.chars()) {
            char := process_character(c);
            if (char != '\u{0}') {
                slug #= Char.toText(char);
            };
        };
        slug;
    };

     // A 200 Ok response with picture
  public func picture(pic : Blob) : Types.Response {
    {
      body = pic;
      headers = [
        ("Content-Type", "image/jpg"),
        ("Access-Control-Allow-Origin", "*")
        //("Expires", "Wed, 9 Jan 2099 09:09:09 GMT")
      ];
      status_code = 200;
      streaming_strategy = null;
    };
  };

  // A 404 response with an optional error message.
  public func http404(msg : ?Text) : Types.Response {
    {
      body = Text.encodeUtf8(
        switch (msg) {
          case (?msg) msg;
          case null "Not found.";
        }
      );
      headers = [("Content-Type", "text/plain")];
      status_code = 404;
      streaming_strategy = null;
    };
  };

  public func paginate<V>(array : [V], chunkSize : Nat) : [[V]] {
        var paginationArray : List.List<[V]> = List.nil<[V]>();
        var num_chunk : Nat = (array.size() + chunkSize -1) / chunkSize;
        for (i in Iter.range(0, num_chunk -1)) {
            var tempArray = List.nil<V>();
            for (j in Iter.range(0, chunkSize -1)) {
                var index = i * chunkSize + j;
                if (index < array.size()) {
                    tempArray := List.push(array[index], tempArray);
                };
            };
            paginationArray := List.push(List.toArray(tempArray), paginationArray);
        };
        List.toArray(paginationArray);
    };


};
