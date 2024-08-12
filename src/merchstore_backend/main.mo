// main.mo

import Types "types";
import Utils "utils";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import TrieMap "mo:base/TrieMap";
import Error "mo:base/Error";
import ICRC "./ICRC";
import XRC "./XRC";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Int "mo:base/Int";
import Cycles "mo:base/ExperimentalCycles";
import Region "mo:base/Region";
import Blob "mo:base/Blob";

actor {

    let g = Source.Source();
    
    //Products
    public type Index = Nat64;
    public type Elem = {
        pos : Nat64;
        size : Nat64;
    };

    public type state = {
        bytes : Region.Region;
        var bytes_count : Nat64;
        elems : Region.Region;
        var elems_count : Nat64;
    };

    private stable var nextProduct : Types.ProductId = 1;

    //private stable var payment_address : Principal = Principal.fromText("aewlj-xenv5-gnrhk-y3di4-gojd3-xl63e-6ritn-ehvzi-pl2zw-2sbbb-wae");
    private stable var payment_address : Principal = Principal.fromText("7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae");
    
    
    stable let icpLedger = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    stable let ckbtcLedger = "mxzaz-hqaaa-aaaar-qaada-cai";
    stable let exchange_rate_canister = "uf6dk-hyaaa-aaaaq-qaaaq-cai";

    private var Users = TrieMap.TrieMap<Principal, Index>(Principal.equal, Principal.hash);
    private stable var stableUsers : [(Principal, Index)] = [];

    stable var user_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    private var products = TrieMap.TrieMap<Types.SlugId, Index>(Text.equal, Text.hash);
    private stable var stableproducts : [(Types.SlugId, Index)] = [];

    stable var product_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new();
        var elems_count : Nat64 = 0;
    };


    private stable var shippingamount : Types.ShippingAmount = {
        shipping_amount = 50.0;
    };

    // -----------------For keeping track of the size and color of the products-------------------

    // private var size = Map.HashMap<Types.SlugId, Types.Size>(0, Text.equal, Text.hash);
    // private stable var stablesizes : [(Types.SlugId, Types.Size)] = [];

    // private var color = Map.HashMap<Types.SlugId, Types.Color>(0, Text.equal, Text.hash);
    // private stable var stablecolors : [(Types.SlugId, Types.Color)] = [];

    private var variants = TrieMap.TrieMap<Types.SlugId, Index>( Text.equal, Text.hash); //! Here Variant Slug will be the key
    private stable var stablevariants : [(Types.SlugId, Index)] = [];

    stable var variant_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };


    private var usersaddresslist = TrieMap.TrieMap<Principal, Index>(Principal.equal, Principal.hash);

    private stable var stableusersaddresslist : [(Principal, Index)] = [];

    stable var address_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    // --------------------------------------------------------------------------------------------------------------------------
    private var categories = TrieMap.TrieMap<Types.SlugId, Index>( Text.equal, Text.hash);
    private stable var stablecategories : [(Types.SlugId, Index)] = [];

    stable var category_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    private var orders = TrieMap.TrieMap<Types.OrderId, Index>(Text.equal, Text.hash);
    private stable var stableorders : [(Types.OrderId, Index)] = [];

    stable var order_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    private var addressToOrder = TrieMap.TrieMap<Text, Text>( Text.equal, Text.hash);
    private stable var stableaddresstoorder : [(Text, Text)] = [];

    // stable var address_to_order_state = {
    //     bytes = Region.new();
    //     var bytes_count : Nat64 = 0;
    //     elems = Region.new ();
    //     var elems_count : Nat64 = 0;
    // };


    //For processing and storing images
    // private stable var currentMemoryOffset : Nat64 = 2;
    // private stable var stableimgOffset : [(Types.ImgI, Nat64)] = [];

    // private var imgOffset : Map.HashMap<Types.ImgId, Nat64> = Map.fromIter(stableimgOffset.vals(), 0, Text.equal, Text.hash);
    // private stable var stableimgSize : [(Types.ImgId, Nat)] = [];

    // private var imgSize : Map.HashMap<Types.ImgId, Nat> = Map.fromIter(stableimgSize.vals(), 0, Text.equal, Text.hash);

    private var wishlistItems = TrieMap.TrieMap<Principal, Index>( Principal.equal, Principal.hash);
    private stable var stablewishlistItems : [(Principal, Index)] = [];

    stable var wishlist_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    
    private var cartItems = TrieMap.TrieMap<Principal, Index>(Principal.equal, Principal.hash);
    private stable var stablecartItems : [(Principal, Index)] = [];

    stable var cart_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };
    // Contact us
    private var contacts = TrieMap.TrieMap<Types.ContactId, Index>(Text.equal, Text.hash);
    private stable var stablecontacts : [(Types.ContactId, Index)] = [];

    stable var contact_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

        // -------------------------- Stablising functions to store data --------------------------------------------------------------

    // Stablising the data
    // Preupgrade function to store the data in stable variables
    system func preupgrade() {
        stableproducts := Iter.toArray(products.entries());
        stablecategories := Iter.toArray(categories.entries());
        stableorders := Iter.toArray(orders.entries());
        stableaddresstoorder := Iter.toArray(addressToOrder.entries());
        // stableimgOffset := Iter.toArray(imgOffset.entries());
        // stableimgSize := Iter.toArray(imgSize.entries());
        stablecontacts := Iter.toArray(contacts.entries());
        stableUsers := Iter.toArray(Users.entries());
        stablevariants := Iter.toArray(variants.entries());
        stableusersaddresslist := Iter.toArray(usersaddresslist.entries());
        stablewishlistItems := Iter.toArray(wishlistItems.entries());
        stablecartItems := Iter.toArray(cartItems.entries());

    };

    // Postupgrade function to restore the data from stable variables
    system func postupgrade() {
        products := TrieMap.fromEntries(stableproducts.vals(), Text.equal, Text.hash);

        categories := TrieMap.fromEntries(stablecategories.vals(), Text.equal, Text.hash);
        
        orders := TrieMap.fromEntries(stableorders.vals(), Text.equal, Text.hash);
        
        addressToOrder := TrieMap.fromEntries(stableaddresstoorder.vals(), Text.equal, Text.hash);

        contacts := TrieMap.fromEntries(stablecontacts.vals(), Text.equal, Text.hash);

        Users := TrieMap.fromEntries(stableUsers.vals(), Principal.equal, Principal.hash);

        variants := TrieMap.fromEntries(stablevariants.vals(), Text.equal, Text.hash);

        usersaddresslist := TrieMap.fromEntries(stableusersaddresslist.vals(), Principal.equal, Principal.hash);

        wishlistItems := TrieMap.fromEntries(stablewishlistItems.vals(), Principal.equal, Principal.hash);

        cartItems := TrieMap.fromEntries(stablecartItems.vals(), Principal.equal, Principal.hash);
    };

    //  *******------------------------   Funtions  -------------------------**********

    // *************** STABLE MEMORY FUNCTIONS ****************

     func regionEnsureSizeBytes(r : Region, new_byte_count : Nat64) {
        let pages = Region.size(r);
        if (new_byte_count > pages << 16) {
        let new_pages = ((new_byte_count + ((1 << 16) - 1)) / (1 << 16)) - pages;
        assert Region.grow(r, new_pages) == pages
        }
    };

    let elem_size = 16 : Nat64;

    func stable_get(index : Index , state : state) : async Blob {
        assert index < state.elems_count;
        let pos = Region.loadNat64(state.elems, index * elem_size);
        let size = Region.loadNat64(state.elems, index * elem_size + 8);
        let elem = { pos ; size };
        Region.loadBlob(state.bytes, elem.pos, Nat64.toNat(elem.size))
    };

    func stable_add(blob : Blob , state : state) : async Index {
        let elem_i = state.elems_count;
        state.elems_count += 1;

        let elem_pos = state.bytes_count;
        state.bytes_count += Nat64.fromNat(blob.size());

        regionEnsureSizeBytes(state.bytes, state.bytes_count);
        Region.storeBlob(state.bytes, elem_pos, blob);

        regionEnsureSizeBytes(state.elems, state.elems_count * elem_size);
        Region.storeNat64(state.elems, elem_i * elem_size + 0, elem_pos);
        Region.storeNat64(state.elems, elem_i * elem_size + 8, Nat64.fromNat(blob.size  ()));
        elem_i
  }; 

  func update_stable(index : Index , blob : Blob , state : state) : async Index {
    assert index < state.elems_count;
    let pos = Region.loadNat64(state.elems, index * elem_size);
    let size = Region.loadNat64(state.elems, index * elem_size + 8);
    let elem = { pos ; size };
    Region.storeBlob(state.bytes, elem.pos, blob);
    Region.storeNat64(state.elems, index * elem_size + 8, Nat64.fromNat(blob.size()));
    index
    };


    //
    private let adminPrincipals : [Text] = [
        "7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae",
        "jkssc-r7bft-rhxnv-xskty-gwy2y-nabjd-asvau-ijwcf-nyvbq-dcazp-zae",
        "ze4vy-q7dc7-tevo4-gi5h4-lqr4b-af3x6-vmiyl-3ya53-dbmc4-qbc6e-yqe",
        "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
        "mmi6f-vbi3x-r3ytg-dath5-qfi5s-rbq3r-75avw-q3ele-ajsft-llzwc-dae",
        "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe",
        "smvf5-lswfz-4usiy-h4u2e-e56bp-ai2f2-kuxmr-62gd4-7ezqk-ueb4f-sqe",
        "qlmrg-xxhxr-2kxys-5kax6-ijfvm-odhit-xdlbv-sab73-b5hy2-rby5u-wae",
        "t6cm6-7mjqg-f5mca-2ez4n-rwefv-4knid-uo2dl-sz7lj-yczc7-edrhr-yae",
        "5rb3s-gzs5u-44taw-infir-l6yk7-tgmp4-34ufs-rgqx6-vwnir-os4ex-xae",
        "lkum4-lq5h6-xakur-f2d56-iuiz5-cmqv4-btmqz-y36ma-rhacf-ycxjr-wae",
        "fzfww-hzqif-jwsdw-jyy7c-6dfgs-7ned2-7vpat-tfimf-nko44-sqvyk-gae",
        "45hqj-gmqer-h4p6j-7suuw-nztam-u3xaj-yg2og-ppjkr-o3zb2-e6riu-lqe",
        "xohej-sjhhi-3orms-nnoqw-5i6ln-xrr4x-j5oa7-ealxd-ltohd-jsw3t-5ae",
        "h7yxq-n6yb2-6js2j-af5hk-h4inj-edrce-oevyj-kbs7a-76kft-vrqrw-nqe"
        ,"x5gb5-ng356-6thlg-xfcjc-pol23-njc4g-zlj3u-xkqvz-3ljz4-f7c3j-zqe"
        ,"tfyvq-6wqn2-cpjj5-3q3qn-jhviz-nrkva-slk4q-if2hz-blylq-xljtq-rae",
        "kws6j-lg7qz-4hnac-saj7i-l2i7g-i2rnx-zaby7-yvn5r-ggp37-ebev6-aae"
    ];

    public func isAdmin(userPrincipal : Principal) : async Bool {
        let userPrincipalStr = Principal.toText(userPrincipal);
        let foundAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );
        switch (foundAdmin) {
            case (null) { return false };
            case (?v) { return true };
        };
    };

    //  ------------------------   Users_Functions -------------------------

    public shared ({ caller }) func updateUser(email : Text, firstName : Text, lastName : Text) : async Result.Result<(Types.User, Index), Types.UpdateUserError> {
        /*  if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */

        if (email == "") { return #err(#EmptyEmail) };
        if (firstName == "") { return #err(#EmptyFirstName) };
        if (lastName == "") { return #err(#EmptyLastName) };

        let user = {
            id = caller;
            email = email;
            firstName = firstName;
            lastName = lastName;
        };
        switch(Users.get(caller)){

            case null {
                let user_blob = to_candid(user);
                Debug.print(debug_show(user_blob));
                let user_index = await stable_add(user_blob, user_state);
                Users.put(caller, user_index);
                return #ok(user, user_index);
            };
            case (?v){
                let user_blob = to_candid(user);
                let user_index = await update_stable(v, user_blob, user_state);
                return #ok(user, user_index);
            };

        };
    };

    public shared ({ caller }) func getUserdetailsbycaller() : async Result.Result<Types.User, Types.GetUserError> {
        let index = Users.get(caller);
        switch(index){
            case null {
                return #err(#UserNotFound);
            };

            case (?val){
                let user_blob = await stable_get(val, user_state);
                Debug.print("The blob for the " # debug_show(caller) # " is: " # debug_show(user_blob));
                let user : ?Types.User = from_candid(user_blob);
                Debug.print("The user data for the " # debug_show(caller) # " is: " # debug_show(user));
                switch(user){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?v){
                        return #ok(v);
                    };
                };
            };
        };
    };

    public shared func getUserdetailsbyid(id : Principal) : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(id);
        switch(user){
            case null {
                return #err(#UserNotFound);
            };

            case (?val){
                let user_blob = await stable_get(val, user_state);
                Debug.print("The blob for the " # debug_show(id) # " is: " # debug_show(user_blob));
                let user : ?Types.User = from_candid(user_blob);
                Debug.print("The user data for the " # debug_show(id) # " is: " # debug_show(user));
                switch(user){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?v){
                        return #ok(v);
                    };
                };
            };
        };
        
    };

    // 📍📍📍📍📍
    public shared func listUsers(chunkSize : Nat , PageNo : Nat) : async{data : [Types.User]; current_page : Nat; total_pages : Nat} {
        let index_pages =  Utils.paginate<(Principal , Index)>(Iter.toArray(Users.entries()), chunkSize);
        if (index_pages.size() < PageNo) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No users found");
        };

        // let data_page:[Types.User] = Array.tabulate<>(index_pages[pageNo],func x(1) = from_candid(x(1)));
        var pages_data = index_pages[PageNo];
        var user_list = List.nil<Types.User>();
        for ((k,v) in pages_data.vals()) {
            
            let user_blob = await stable_get(v, user_state);
            let user : ?Types.User = from_candid(user_blob);
            switch(user){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    user_list := List.push(val, user_list);
                };
            };
        };

        return { data = List.toArray(user_list); current_page = PageNo + 1; total_pages = index_pages.size(); };
    };

    //  ***************************************** Users Address CRUD Operations *****************************************************
    public shared ({ caller }) func createAddress(
        userAddress : Types.UserAddress
    ) : async Result.Result<(Types.Address , Index), Types.CreateAddressError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        let userP : Principal = caller;

        let address = {
            id = UUID.toText(await g.new());
            firstname = userAddress.firstname;
            lastname = userAddress.lastname;
            email = userAddress.email;
            phone_number = userAddress.phone_number;
            address_type = userAddress.address_type;
            addressline1 = userAddress.addressline1;
            addressline2 = userAddress.addressline2;
            city = userAddress.city;
            state = userAddress.state;
            country = userAddress.country;
            pincode = userAddress.pincode;
        };

        let usersAddresses = usersaddresslist.get(userP);
        switch (usersAddresses) {
            case null {
                Debug.print("No addresses found for the user");
                var addressitems : List.List<Types.Address> = List.nil<Types.Address>();
                
                var address_object : Types.addressobject = {
                    userprincipal = userP;
                    addresslist = List.push(address,addressitems);
                };
                let addressblob = to_candid(address_object);
                let address_index = await stable_add(addressblob, address_state);
                usersaddresslist.put(userP, address_index);
                return #ok(address , address_index);
            };
            case (?v) {
                Debug.print("Some Addresses found for the user");
                let wishlist_blob = await stable_get(v, address_state);
                let address_object : ?Types.addressobject = from_candid(wishlist_blob);
                switch(address_object){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?val){
                        let addresslist = val.addresslist;
                        let templist = List.find<Types.Address>(
                            addresslist,
                            func(a : Types.Address) : Bool {
                                return a.id == address.id;
                            },
                        );
                        switch(templist){
                        case null{
                            let newaddresslist = List.push(address, addresslist);
                            let newaddressobject : Types.addressobject = {
                                userprincipal = userP;
                                addresslist = newaddresslist;
                            };
                            let newaddressblob = to_candid(newaddressobject);
                            let newaddress_index = await update_stable(v, newaddressblob, address_state);
                            return #ok(address, newaddress_index);
                        };
                        case (?value){
                            return #err(#AddressAlreadyExists);
                        };
                    };
                };
            };
        };
    };
};

    public shared ({ caller }) func updateAddress(address : Types.Address, id : Text, callerP : Principal) : async Result.Result<(Types.Address), Types.UpdateAddressError> {
        if (Principal.isAnonymous(caller)) {
            return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        };
       
        let userP : Principal = callerP;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                throw Error.reject("No addresses found");
            };
            case (?existingAddresses) {
                let address_blob = await stable_get(existingAddresses, address_state);
                let addresses : ?Types.addressobject = from_candid(address_blob);
                switch(addresses){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?val){
                    let tempaddresslist = val.addresslist;
                    var oldaddress = List.find<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.id == id;
                    },
                );
                switch (oldaddress) {
                    case (null) {
                        return #err(#AddressNotFound);
                    };
                    case (?a) {
                        let newaddress : Types.Address = {
                            id = id;
                            firstname = address.firstname;
                            lastname = address.lastname;
                            email = address.email;
                            phone_number = address.phone_number;
                            address_type = address.address_type;
                            addressline1 = address.addressline1;
                            addressline2 = address.addressline2;
                            city = address.city;
                            state = address.state;
                            country = address.country;
                            pincode = address.pincode;
                        };
                        //* Here I have created a new list with Item those are not similar to the address we are updating and then we are adding the new address to the list
                        let updatedAddresses = List.filter<Types.Address>(
                            tempaddresslist,
                            func(a : Types.Address) : Bool {
                                return a.id != id;
                            },
                        );
                        // add new address to the list and then pushing it to the hashmap
                        let newAddresses = List.push(newaddress, updatedAddresses);
                        let newaddressobject : Types.addressobject = {
                            userprincipal = userP;
                            addresslist = newAddresses;
                        };
                        let newaddressblob = to_candid(newaddressobject);
                        ignore await update_stable(existingAddresses, newaddressblob, address_state);
                        return #ok(newaddress);
                    };
                };
            };
        };
        };
    };
    };

    public shared ({ caller }) func getAddress(address_type : Text) : async Result.Result<Types.Address, Types.GetAddressError> {
        let userP : Principal = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                throw Error.reject("No addresses found");
            };
            case (?existingAddresses) {
                let address_blob = await stable_get(existingAddresses, address_state);
                let addresses : ?Types.addressobject = from_candid(address_blob);
                switch (addresses) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                    let tempaddresslist = val.addresslist;
                    var address = List.find<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.address_type == address_type;
                    },
                );
                switch (address) {
                    case (null) {
                        return #err(#AddressNotFound);
                    };
                    case (?a) {
                        return #ok(a);
                    };
                };
            };
        };
            };
        };
    };

    public shared ({ caller }) func deleteaddress(address_type : Text) : async Result.Result<(), Types.DeleteAddressError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
        let userP : Principal = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                throw Error.reject("No addresses found");
            };
            case (?existingAddresses) {
                let address_blob = await stable_get(existingAddresses, address_state);
                let addresses : ?Types.addressobject= from_candid(address_blob);
                switch (addresses) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let tempaddresslist = val.addresslist;
                let updatedAddresses = List.filter<Types.Address>(
                    tempaddresslist,
                    func(a : Types.Address) : Bool {
                        return a.address_type != address_type;
                    },
                );
                let newobj : Types.addressobject = {
                    userprincipal = userP;
                    addresslist = updatedAddresses;
                };
                let newaddressblob = to_candid(newobj);
                ignore await update_stable(existingAddresses, newaddressblob, address_state);
                return #ok(());
            };
                };
            };
        };
    };


//📍📍📍📍📍
    public shared ({ caller }) func listUserAddresses() : async [Types.Address] {
        let userP = caller;
        let userAddresses = usersaddresslist.get(userP);
        switch (userAddresses) {
            case null {
                throw Error.reject("No addresses found");
            };
            case (?existingAddresses) {
                let address_blob = await stable_get(existingAddresses, address_state);
                let addresses : ?Types.addressobject = from_candid(address_blob);
                switch (addresses) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return List.toArray(val.addresslist);
                    };
                };
            };
        };
    };

    // **************************** Variant Functions **********************************
  
    public shared (msg) func createVariant(
        product_slug : Types.SlugId,
        size : Text,
        color : Text,
        inventory : Nat,
        variant_price : Float,
        variant_sale_price : Float

    ) : async Result.Result<(Types.Variants), Types.CreateVariantError> {
        if (Principal.isAnonymous(msg.caller)) {
            return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        };
        // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        if (size == "") {
            return #err(#EmptySize);
        };
        if (color == "") {
            return #err(#EmptyColor);
        };

        let variantId = Utils.slugify(color) # "-" # (size);

        let variant : Types.Variants = {
            variant_slug = variantId;
            product_slug = product_slug;
            size = size;
            color = color;
            variant_price = variant_price;
            variant_sale_price = variant_sale_price;
            inventory = inventory;
        };
        let variant_blob = to_candid(variant);
        let variant_index = await stable_add(variant_blob, variant_state);

        variants.put(variantId, variant_index);
        return #ok(variant);
    };

    public shared ({ caller }) func deletevariant(variant_slug : Types.SlugId) : async Result.Result<(), Types.DeleteVariantError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        variants.delete(variant_slug);
        return #ok(());
    };

    public shared ({ caller }) func updatevariant(
        variant_slug : Types.SlugId,
        size : Text,
        color : Text,
        inventory : Nat,
        variant_price : Float,
        variant_sale_price : Float,
    ) : async Result.Result<(Types.Variants), Types.UpdateVariantError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        if (size == "") {
            return #err(#EmptySize);
        };
        if (color == "") {
            return #err(#EmptyColor);
        };

        let result = variants.get(variant_slug);
        switch (result) {
            case null {
                return #err(#VariantNotFound);
            };
            case (?v) {
                let old_blob = await stable_get(v, variant_state);
                let old_variant : ?Types.Variants = from_candid(old_blob);
                switch (old_variant) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let variant : Types.Variants = {
                    variant_slug = val.variant_slug;
                    product_slug = val.product_slug;
                    size = size;
                    color = color;
                    variant_price = variant_price;
                    variant_sale_price = variant_sale_price;
                    inventory = inventory;
                };

                let variant_blob = to_candid(variant);
                let index =  await update_stable(v, variant_blob, variant_state);
                variants.put(variant_slug, index);
                return #ok(variant);
            };
            };
            };
        };
    };

    public shared func getvariant(variant_slug : Types.SlugId) : async Result.Result<Types.Variants, Types.GetVariantError> {
        let variant = variants.get(variant_slug);
        switch (variant) {
            case null {
                return #err(#VariantNotFound);
            };
            case (?v) {
                let variant_blob = await stable_get(v, variant_state);
                let variant : ?Types.Variants = from_candid(variant_blob);
                switch (variant) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return #ok(val);
                    };
                };
            };
        };
    };

    //  ------------------   Products_Functions ----------------

    public shared ({ caller }) func createProduct(p : Types.UserProduct, vs : [Types.VariantSize], vc : [Types.VariantColor]) : async Result.Result<(Types.Product), Types.CreateProductError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        let category_slug = p.category;

        /* if (checkifcategoryexists(category_slug) == false) {
            return #err(#CategoryNotFound);
        }; */  
        if (p.title == "") { return #err(#EmptyTitle) };
        let productId = nextProduct;
        nextProduct += 1;
        // increment the counter so we never try to create a product under the same index
        let newSlug = Utils.slugify(p.title) # "-" # Nat.toText(nextProduct); //this should keep slug always unique and we can key hashMap with it
        // var imgSlug : Types.SlugId = "";
        // switch (img) {
        //     case null {
        //         // do nothing if there is no image attached
        //     };
        //     case (?imageBlob) {
        //         storeBlobImg(newSlug, imageBlob);
        //         imgSlug := newSlug;
        //     };
        // };
        let product : Types.Product = {
            title = p.title;
            id = productId;
            //price = p.price;
            //sellingPrice = p.sellingPrice;
            category = p.category;
            description = p.description;
            active = p.active;
            newArrival = p.newArrival;
            trending = p.trending;
            variantSize = vs;
            variantColor = vc;
            //img = img;
            slug = newSlug;
            time_created = Time.now();
            time_updated = Time.now();
        };

        let product_blob = to_candid(product);
        let product_index = await stable_add(product_blob, product_state);
        products.put(newSlug, product_index);
        return #ok(product);
    };

    public shared (msg) func updateProduct(
        id : Types.SlugId,
        p : Types.UserProduct,
        vs : [Types.VariantSize],
        vc : [Types.VariantColor],
        //img : Text,
    ) : async Result.Result<(Types.Product,Index), Types.UpdateProductError> {
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        if (p.title == "") {
            return #err(#EmptyTitle);
        };

        let result = products.get(id);
        switch (result) {
            case null {
                // If the result is null, we return a ProductNotFound error.
                return #err(#ProductNotFound);
            };
            case (?v) {
                //If the product was found, we try to update it.
                let product_blob = await stable_get(v, product_state);
                let product : ?Types.Product = from_candid(product_blob);
                switch (product) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                    let product : Types.Product = {
                        title = p.title;
                        id = val.id;
                        //price = p.price;
                        //sellingPrice = p.sellingPrice;
                        category = p.category;
                        description = p.description;
                        active = p.active;
                        trending = p.trending;
                        newArrival = p.newArrival;
                        variantSize = vs;
                        variantColor = vc;
                        //img = img;
                        // keep persistent URLS
                        slug = val.slug;
                        time_created = val.time_created;
                        // only update time_updated
                        time_updated = Time.now();
                    };
                    let product_blob = to_candid(product);
                    let index = await update_stable(v, product_blob, product_state);

                return #ok(product,index);
            };
                };
            };
        };
    };

    // Delete the Products
    public shared (msg) func deleteProduct(id : Types.SlugId) : async Result.Result<(), Types.DeleteProductError> {
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        products.delete(id);
        return #ok(());
    };

    // query Products

    public shared func getProduct(id : Types.SlugId) : async Result.Result<Types.Product, Types.GetProductError> {
        let product = products.get(id);
        switch (product) {
            case (?v) {
                let product_blob = await stable_get(v, product_state);
                let product : ?Types.Product = from_candid(product_blob);
                switch (product) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return #ok(val);
                    };
                };
            };
            case null {
                return #err(#ProductNotFound);
            };
        };
        // If the post is not found, this will return an error as result.
    };

    public shared func search_by_title(chunksize : Nat , page : Nat , is_active :Bool , Title : Text) : async {data : [Types.Product]; current_page : Nat; total_pages : Nat} {
        var product_list = List.nil<Types.Product>();
        for ((k,v) in products.entries()) {
            let product_blob = await stable_get(v, product_state);
            let product : ?Types.Product = from_candid(product_blob);
            switch(product){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    if (Text.contains(val.title, #text Title) == true and val.active == is_active){
                        product_list := List.push(val, product_list);
                    };
                };
            };
        };
        let index_pages = Utils.paginate<(Types.Product)>(List.toArray(product_list),chunksize);
        if (index_pages.size() < page) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No products found");
        };
        let pages_data = index_pages[page];
        return { data = pages_data; current_page = page + 1; total_pages = index_pages.size(); };
    };

    public shared ({caller}) func search_by_category(chunksize : Nat , pageNo : Nat, is_active : Bool, category : Text) : async {data : [Types.Product]; current_page : Nat; total_pages : Nat} {
        var product_list = List.nil<Types.Product>();
        for ((k,v) in products.entries()) {
            let product_blob = await stable_get(v, product_state);
            let product : ?Types.Product = from_candid(product_blob);
            switch(product){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    if (val.category == category and val.active == is_active){
                        product_list := List.push(val, product_list);
                    };
                };
            };
        };
        let index_pages = Utils.paginate<(Types.Product)>(List.toArray(product_list),chunksize);
        if (index_pages.size() < pageNo) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No products found");
        };
        let pages_data = index_pages[pageNo];
        return { data = pages_data; current_page = pageNo + 1; total_pages = index_pages.size(); };
    };



    // 📍📍📍📍📍
    public shared ({caller}) func listallProducts(chunksize : Nat , pageNo : Nat, is_active : Bool,  ) : async {data : [Types.Product]; current_page : Nat; total_pages : Nat} {
        let adminstatus = await isAdmin(caller);
        if (adminstatus == true){
        
        let index_pages = Utils.paginate<(Types.SlugId,Index)>(Iter.toArray(products.entries()),chunksize);
    
        if (index_pages.size() < pageNo) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No products found");
        };
        let pages_data = index_pages[pageNo];
        var product_list = List.nil<Types.Product>();
        for ((k,v) in pages_data.vals()) {
            let product_blob = await stable_get(v, product_state);
            let product : ?Types.Product = from_candid(product_blob);
            switch(product){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller"); 
           };
                case(?val){
                    product_list := List.push(val, product_list);
                };
            };
        };
        return { data = List.toArray(product_list); current_page = pageNo + 1; total_pages = index_pages.size(); };
        } else{
            var product_list = List.nil<Types.Product>();
            for ((k,v) in products.entries()) {
                let product_blob = await stable_get(v, product_state);
                let product : ?Types.Product = from_candid(product_blob);
                switch(product){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller"); 
                    };
                    case(?val){
                    product_list := List.push(val, product_list);
                    };
                };
            };
            let active_products = List.filter<Types.Product>(
                product_list,
                func(p : Types.Product) : Bool {
                    return p.active == is_active;
                },
            );

            let index_pages = Utils.paginate<Types.Product>(List.toArray(active_products), chunksize);
            if (index_pages.size() < pageNo) {
                throw Error.reject("Page not found");
            };
            if (index_pages.size() == 0) {
                throw Error.reject("No products found");
            };
            let pages_data = index_pages[pageNo];
        return { data = pages_data; current_page = pageNo + 1; total_pages = index_pages.size(); };
        };
    };


    //--------------------------------  Image_procession as blobs    --------------------------------------------------------------------------------------//

    // private func storeBlobImg(imgId : Types.ImgId, value : Blob) {
    //     var size : Nat = Nat32.toNat(Nat32.fromIntWrap(value.size()));
    //     // Each page is 64KiB (65536 bytes)
    //     var growBy : Nat = size / 65536 + 1;
    //     let a = Memory.grow(Nat64.fromNat(growBy));
    //     Memory.storeBlob(currentMemoryOffset, value);
    //     imgOffset.put(imgId, currentMemoryOffset);
    //     imgSize.put(imgId, size);
    //     size := size + 4;
    //     currentMemoryOffset += Nat64.fromNat(size);
    // };

    // private func loadBlobImg(imgId : Types.ImgId) : ?Blob {
    //     let offset = imgOffset.get(imgId);
    //     switch (offset) {
    //         case (null) {
    //             return null;
    //         };
    //         case (?offset) {
    //             let size = imgSize.get(imgId);
    //             switch (size) {
    //                 case (null) {
    //                     return null;
    //                 };
    //                 case (?size) {
    //                     return ?Memory.loadBlob(offset, size);
    //                 };
    //             };
    //         };
    //     };
    // };

    // public query func http_request(request : Types.Request) : async Types.Response {
    //     if (Text.contains(request.url, #text("imgid"))) {
    //         let imgId = Iter.toArray(Text.tokens(request.url, #text("imgid=")))[1];
    //         var pic = loadBlobImg(imgId);
    //         switch (pic) {
    //             case (null) {
    //                 return Utils.http404(?"no picture available");
    //             };
    //             case (?existingPic) {
    //                 return Utils.picture(existingPic);
    //             };
    //         };
    //     };
    //     return Utils.http404(?"Path not found.");
    // };

    // ------------------------------------  CATEGORY_FUNCTIONS  ---------------------------------------------

    public shared (msg) func createCategory(name : Text, cat_img : Text, featured : Bool, active : Bool) : async Result.Result<(Types.Category, Index), Types.CreateCategoryError> {
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        if (name == "") { return #err(#EmptyName) };
        let new_slug = Utils.slugify(name);
        let result = categories.get(new_slug);
        switch (result) {
            case null {
                let category : Types.Category = {
                    name = name;
                    slug = new_slug;
                    category_img = cat_img;
                    featured = featured;
                    active = active;
                };
                let category_blob = to_candid(category);
                let category_index = await stable_add(category_blob, category_state);

                categories.put(new_slug, category_index);
                return #ok(category, category_index);
            };
            case (?v) {
                // We want category to exist only once
                return #err(#CategoryAlreadyExists);
            };
        };
    };

    public shared (msg) func updateCategory(
        id : Types.SlugId,
        name : Text,
        cat_img : Text,
        feaured : Bool,
        active : Bool,
    ) : async Result.Result<(Types.Category, Index), Types.UpdateCategoryError> {
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        if (name == "") {
            return #err(#EmptyName);
        };

        let result = categories.get(id);

        switch (result) {
            case null {
                return #err(#CategoryNotFound);
            };
            case (?v) {
                let category_blob = await stable_get(v, category_state);
                let category : ?Types.Category = from_candid(category_blob);
                switch (category) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let category : Types.Category = {
                    name = name;
                    slug = val.slug;
                    category_img = cat_img;
                    featured = feaured;
                    active = active;

                };
                let category_blob = to_candid(category);
                let index = await update_stable(v, category_blob, category_state);

                categories.put(id, index);
                return #ok(category,index);
            };
        };
        };
        };
    };

    public shared func getCategory(id : Types.SlugId) : async Result.Result<Types.Category, Types.GetCategoryError> {
        let category = categories.get(id);
        switch (category) {
            case (?v) {
                let category_blob = await stable_get(v, category_state);
                let category : ?Types.Category = from_candid(category_blob);
                switch (category) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return #ok(val);
                    };
                };
            };
            case null {
                return #err(#CategoryNotFound);
            };
        };
        // If the post is not found, this will return an error as result.
    };

    public shared (msg) func deleteCategory(id : Types.SlugId) : async Result.Result<(), Types.DeleteCategoryError> {
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        categories.delete(id);
        return #ok(());
    };

    // 📍📍📍📍📍
    public shared func listCategories(chunkSize : Nat , pageNo : Nat) : async {data :[Types.Category]; current_page : Nat; total_pages : Nat} {
        let index_pages = Utils.paginate<(Types.SlugId, Index)>(Iter.toArray(categories.entries()),chunkSize);
        if (index_pages.size() < pageNo) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No categories found");
        };
        var pages_data = index_pages[pageNo];
        var category_list = List.nil<Types.Category>();
        for ((k,v) in pages_data.vals()) {
            let category_blob = await stable_get(v, category_state);
            let category : ?Types.Category = from_candid(category_blob);
            switch(category){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    category_list := List.push(val, category_list);
                };
            };
        };
        return { data = List.toArray(category_list); current_page = pageNo + 1; total_pages = index_pages.size(); };
        
    };

    func checkifcategoryexists(slug : Text) : Bool {
        let result = categories.get(slug);
        switch (result) {
            case null {
                return false;
            };
            case (?v) {
                return true;
            };
        };
    }; 

    //  -----------------------------------   Wishlist_Functions ---------------------------------------------------------------------------------------------------------

    public shared (msg) func addtoWishlist(product_slug : Text, size : Text , color : Text) : async Result.Result<(Types.wishlistItemobject, Index), Types.CreateWishlistItemError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        if (product_slug == "") { return #err(#EmptyProductSlug) };
        let userP : Principal = msg.caller;

        let wishlistItem : Types.WishlistItem = {
            size = size;
            color = color;
            product_slug = product_slug;
            time_created = Time.now();
            time_updated = Time.now();
        };
        switch (wishlistItems.get(userP)) {
            case null {
                Debug.print("No wishlist items found for the user");
                var wishlistitems : List.List<Types.WishlistItem> = List.nil<Types.WishlistItem>();
                var wishlistitemobject : Types.wishlistItemobject = {
                    userprincipal = userP;
                    wishlistItem = List.push(wishlistItem, wishlistitems);
                }; 
                let wishlist_blob = to_candid(wishlistitemobject);
                let wishlist_index = await stable_add(wishlist_blob, wishlist_state);
                wishlistItems.put(userP, wishlist_index);
                return #ok(wishlistitemobject, wishlist_index);
            };
            case (?v) {
                Debug.print("wishlist items found for the user so we are adding the new one to the existing list !!!!");
                let wishlist_blob = await stable_get(v, wishlist_state);
                let wishlistitems : ?Types.wishlistItemobject = from_candid(wishlist_blob);
                switch (wishlistitems) { 
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        Debug.print("items are " # debug_show(val));
                        var newWishlistItems = val.wishlistItem;

                        Debug.print("cartlist before adding the new item is: " # debug_show(newWishlistItems));

                        let updatedWishlistItems = List.push(wishlistItem, newWishlistItems);
                        
                        let newobject : Types.wishlistItemobject = {
                            userprincipal = userP;
                            wishlistItem = updatedWishlistItems;
                        };
                        let newWishlistBlob = to_candid(newobject);
                        let index = await update_stable(v, newWishlistBlob, wishlist_state);
                        return #ok(newobject, index);
                    };
                };
            };
        };
    };

    // public shared (msg) func updateWishlistItems(
    //     id : Types.WishlistId
    // ) : async Result.Result<(Types.WishlistItem, Index), Types.UpdateWishlistItemError> {
    //     // commented for local development
    //     if (Principal.isAnonymous(msg.caller)) {
    //         return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    //     };

    //     let result = wishlistItems.get(id);
    //     switch (result) {
    //         case null {
    //             // If the result is null, we return a ProductNotFound error.
    //             return #err(#WishlistItemNotFound);
    //         };
    //         case (?v) {

    //             let wishlistItem : Types.WishlistItem = {
    //                 id = v.id;
    //                 product_slug = v.product_slug;
    //                 principal = v.principal;
    //                 time_created = v.time_created;
    //                 time_updated = Time.now();
    //             };
    //             wishlistItems.put(id, wishlistItem);
    //             return #ok(wishlistItem);
    //         };
    //     };
    // };

    public shared (msg) func deleteWishlistItems(product_slug : Text, size : Text , color : Text) : async Result.Result<Types.wishlistItemobject, Types.DeleteWishlistItemError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
       let wishlist_index = wishlistItems.get(msg.caller);
       switch (wishlist_index) {
           case null {
               return #err(#listisempty);
           };
           case (?v) {
               let wishlist_blob = await stable_get(v, wishlist_state);
               let wishlistitems : ?Types.wishlistItemobject = from_candid(wishlist_blob);
               switch (wishlistitems) {
                   case null {
                       throw Error.reject("no blob found in stable memory for the caller");
                   };
                   case (?val) {
                       let newWishlistItems = val.wishlistItem;
                       Debug.print("newWishlistItems are " # debug_show(newWishlistItems));
                       let result = List.find<Types.WishlistItem>(
                           newWishlistItems,
                           func(a : Types.WishlistItem) : Bool {
                               return a.product_slug == product_slug and a.color == color and a.size == size;
                           },
                       );
                          switch (result) {
                            case (null) {
                                 return #err(#WishlistItemNotFound);
                            };
                            case (?a) {
                                 let updatedWishlistItems = List.mapFilter<Types.WishlistItem,Types.WishlistItem>(
                                      newWishlistItems,
                                      func(a : Types.WishlistItem) : ?Types.WishlistItem {
                                            if (a.product_slug == product_slug and a.color == color and a.size == size) {
                                                return null;
                                            };
                                            return ?a;
                                        
                                    }); 

                                Debug.print("updatedWishlistItems are " # debug_show(updatedWishlistItems));


                                let newobject : Types.wishlistItemobject = {
                                    userprincipal = msg.caller;
                                    wishlistItem = updatedWishlistItems;
                                };

                                let newWishlistBlob = to_candid(newobject);
                                ignore await update_stable(v, newWishlistBlob, wishlist_state);
                                return #ok(newobject);
                            };
                        };
                    };
                };
            };
        };
    };

    // 📍📍📍📍📍
    public shared ({caller}) func listWishlistItems(chunkSize : Nat , pageNo : Nat) : async {data :[Types.WishlistItem]; current_page : Nat; total_pages : Nat} {
        let userWishlistItems = wishlistItems.get(caller);
        switch (userWishlistItems) {
            case null {
                throw Error.reject("No wishlist items found");
            };
            case (?v) {
                let items_blob = await stable_get(v, wishlist_state);
                Debug.print("items_blob is " # debug_show(items_blob));
                let items_data : ?Types.wishlistItemobject = from_candid(items_blob);
                switch (items_data) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        Debug.print("items are " # debug_show(val));
                        let pages = Utils.paginate<Types.WishlistItem>(List.toArray(val.wishlistItem),chunkSize);
        
                        if (pages.size() < pageNo) {
                            throw Error.reject("Page not found");
                        };
                        if (pages.size() == 0) {
                            throw Error.reject("No wishlist items found");
                        };
                        
                        Debug.print("pages are " # debug_show(pages));
                    return { data = pages[pageNo]; current_page = pageNo + 1; total_pages = pages.size();   
                    };
                };
            };  
            };
        };
    };  

    //  -----------------------------------   Cart_Functions -----------------------------------------------------------------------------------------------------------------

    public shared (msg) func addtoCartItems(product_slug : Text, size : Text, color : Text, qty : Nat8) : async Result.Result<(Types.cartItemobject , Index), Types.CreateCartItemsError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };

        if (product_slug == "") { return #err(#EmptyProductSlug) };

        let userP : Principal = msg.caller;

        let cartItem : Types.CartItem = {
            product_slug = product_slug;
            size = size;
            color = color;
            quantity = qty;
            time_created = Time.now();
            time_updated = Time.now();
        };

        switch (cartItems.get(userP)) {
            case null {
                Debug.print("No cart items found for the user so we are adding the first one !!!!");
                var cartlist : List.List<Types.CartItem> = List.nil<Types.CartItem>();
                var cartobject : Types.cartItemobject = {userprincipal = userP ;cartItemlist = List.push(cartItem, cartlist)};
                let cart_blob = to_candid(cartobject);
                let cart_index = await stable_add(cart_blob, cart_state);
                cartItems.put(userP, cart_index);   
                return #ok(cartobject, cart_index);
            };
            case (?v) {
                Debug.print("Cart items found for the user so we are adding the new one to the existing list !!!!");
                let cart_blob = await stable_get(v, cart_state);
                Debug.print("cart_blob is " # debug_show(cart_blob));
                var cartitemsobject : ?Types.cartItemobject = from_candid(cart_blob);
                switch (cartitemsobject) {
                    case null {
                        throw Error.reject("No items forund in the stable memory for this one ");
                    };
                    case (?val) {
                        Debug.print("items are " # debug_show(val));
                            var cartlist = val.cartItemlist;
                            Debug.print("cartlist before adding the new item is: " # debug_show(cartlist));
                            let newlist =  List.push(cartItem, cartlist);
                            Debug.print("cartlist after adding new item is " # debug_show(newlist));

                            let newcartobject = {userprincipal = userP ;cartItemlist = newlist};

                            Debug.print("new cart object after update is : " # debug_show(newcartobject));

                            let newCartBlob = to_candid(newcartobject);

                            let index = await update_stable(v, newCartBlob, cart_state);

                            return #ok(newcartobject, index);
                            };
                            case (_) {
                                return #err(#CartItemAlreadyExists);
                            };
                        };
                    };
                };
            };

    public shared (msg) func updateCartItems(
        slug : Text,
        qty : Nat8,
        size : Text,
        color : Text,
    ) : async Result.Result<(Types.CartItem), Types.UpdateCartItemsError> {
        // commented for local development
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };

        let result = cartItems.get(msg.caller);
        switch (result) {
            case null {
                // If the result is null, we return a ProductNotFound error.
                return #err(#CartisEmpty);
            };
            case (?v) {
                let cart_blob = await stable_get(v, cart_state);
                let cartitems : ?Types.cartItemobject = from_candid(cart_blob);
                switch (cartitems) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        let cartitemslist = val.cartItemlist;
                        var cartItems = List.find<Types.CartItem>(
                            cartitemslist,
                            func(a : Types.CartItem) : Bool {
                                return a.product_slug == slug;
                            },
                        );
                        switch (cartItems) {
                            case (null) {
                                throw Error.reject("no item found in the cart");
                            };
                            case (?a) {
                                let cartItem : Types.CartItem = {
                                    product_slug = slug;
                                    size = size;
                                    color = color;
                                    quantity = qty;
                                    time_created = a.time_created;
                                    time_updated = Time.now();
                                };
                                var previouslist = List.filter<Types.CartItem>(
                                    cartitemslist,
                                    func(a : Types.CartItem) : Bool {
                                        return a.product_slug != slug;
                                    },
                                );
                                let newlist = List.push(cartItem, previouslist);
                                let newcartobject : Types.cartItemobject = {userprincipal = msg.caller; cartItemlist = newlist};
                                let cart_blob = to_candid(newcartobject);
                                ignore await update_stable(v, cart_blob, cart_state);
                                return #ok(cartItem);
                            };
                        };
                    };
                };
            };
        };
    };

    public shared (msg) func deleteCartItems(product_slug : Text , size : Text, color : Text  ) : async Result.Result<(), Types.DeleteCartItemsError> {

        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
         let cart_index = cartItems.get(msg.caller);
            switch (cart_index) {
                case null {
                    return #err(#CartisEmpty);
                };
                case (?v) {
                    let cart_blob = await stable_get(v, cart_state);
                    var cartitemsobject : ?Types.cartItemobject = from_candid(cart_blob);
                    switch (cartitemsobject) {
                        case null {
                            throw Error.reject("no blob found in stable memory for the caller");
                        };
                        case (?val) {
                            var newCartItemslist = val.cartItemlist;
                            Debug.print("items before deletion are " # " ---------> " #  debug_show(newCartItemslist));
                            let result = List.find<Types.CartItem>(
                                newCartItemslist,
                                func(a : Types.CartItem) : Bool {
                                    return a.product_slug == product_slug and a.size == size and a.color == color;
                                });
                                switch (result) {
                                    case (null) {
                                        return #err(#CartItemNotFound);
                                    };
                                    case (?a) {
                                        // let updatedCartItems = List.filter<Types.CartItem>(
                                        //     newCartItemslist,
                                        //     func(a : Types.CartItem) : Bool { 
                                        //     return a.product_slug != product_slug and a.size != size and a.color != color;
                                        //     });
                                        // Debug.print("items after deletion are " # "  <--------->   " # debug_show(updatedCartItems));



                                        let after_deletion_list = List.mapFilter<Types.CartItem,Types.CartItem>(newCartItemslist, func (a : Types.CartItem) : ?Types.CartItem {
                                            if (a.product_slug == product_slug and a.size == size and a.color == color) {
                                                return null;
                                            };
                                            return ?a;
                                        });

                                        let newcartitemsobject : Types.cartItemobject = {userprincipal = msg.caller ;cartItemlist = after_deletion_list};
                                        let newCartBlob = to_candid(newcartitemsobject);
                                        ignore await update_stable(v, newCartBlob, cart_state);
                                        return #ok(());
                            };
                        };
                    };
                };
            };
        };
    };
                    

    // 📍📍📍📍📍
    public shared (msg) func getCallerCartItems(chunkSize : Nat , pageNo : Nat) : async {data :[Types.CartItem]; current_page : Nat; total_pages : Nat} {
        // Assuming `cartItems` is your existing HashMap<CartId, CartItem>
        let caller = msg.caller;
        let result = cartItems.get(caller);
        switch (result) {
            case null {
                throw Error.reject("No cart items found");
            };
            case (?v) {
                let cart_blob = await stable_get(v, cart_state);
                Debug.print("cart_blob is " # debug_show(cart_blob));
                let cartitems : ?Types.cartItemobject = from_candid(cart_blob);
                switch (cartitems) {
                    case (?val) {
                        Debug.print("items are " # debug_show(val));
                        let pages = Utils.paginate<Types.CartItem>(List.toArray(val.cartItemlist),chunkSize);
                        if (pages.size() < pageNo) {
                            throw Error.reject("Page not found");
                        };
                        if (pages.size() == 0) {
                            throw Error.reject("No cart items found");
                        };
                        Debug.print("pages are " # debug_show(pages));
                        return { data = pages[pageNo]; current_page = pageNo + 1; total_pages = pages.size(); 
                    };
                };
                case (_){
                    throw Error.reject("no blob found in stable memory for the caller");
                };
            };
        };
    };
    };
    

    public shared (msg) func clearallcartitmesbyprincipal() : async Result.Result<(), Types.DeleteCartItemsError> {
        //  if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated);
        // };
        let caller = msg.caller;
        cartItems.delete(caller);
        return #ok(());
    };

    //  -----------------------------------   Orders_Functions --------------------------------------------------------------------------------------------

    public shared ({ caller }) func updateshippingamount(s : Types.ShippingAmount) : async Result.Result<(Types.ShippingAmount), Types.UpdateShippingAmountError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        if (s.shipping_amount == 0.00) {
            return #err(#EmptyShippingAmount);
        };
        shippingamount := s;
        return #ok(s);
    };

    public shared query func getshippingamount() : async Types.ShippingAmount {
        return shippingamount;
    };

    public shared (msg)func createOrder(order : Types.NewOrder ) : async Result.Result<Types.Order, Types.OrderError> {
        // if (Principal.isAnonymous(msg.caller)) {
        //     return #err(#UserNotAuthenticated); // We require the user to be authenticated,
        // };
         
         
        switch (addressToOrder.get(order.paymentAddress)) {
            case (?order) return #err(#PaymentAddressAlreadyUsed);
            case null {
                let orderId : Types.OrderId = UUID.toText(await g.new());
                var newOrder : Types.Order = {
                    id = orderId;
                    shippingAddress = order.shippingAddress;
                    products = order.products;
                    userid = order.userid;
                    totalAmount = order.totalAmount;
                    subTotalAmount = order.subTotalAmount;
                    shippingAmount = shippingamount;
                    orderStatus = order.orderStatus;
                    paymentStatus = order.paymentStatus;
                    paymentAddress = order.paymentAddress;
                    paymentMethod = order.paymentMethod;
                    awb = order.awb;
                    timeCreated = Time.now();
                    timeUpdated = Time.now();
                };
                let order_blob = to_candid(newOrder);
                let order_index = await stable_add(order_blob, order_state);
                orders.put(orderId, order_index);

                addressToOrder.put(newOrder.paymentAddress, newOrder.id );
                return #ok(newOrder);
            };
        };
    };

    // public shared (msg) func place_order(neworder : Types.NewOrder , from : Principal, amount : Nat , paymentOption : { #icp; #ckbtc }) : async  Result.Result<(Types.Order , ICRC.Result), Types.OrderError> {
    //     if (Principal.isAnonymous(msg.caller)) {
    //         return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    //     };
    //     switch (paymentOption){
    //         case (#icp) {
    //             let response : ICRC.Result_2 = await icrc2_transferFrom(icpLedger, from, payment_address, amount);
    //             switch (response) {
    //                 case (#Err(index)) {
    //                     throw Error.reject(debug_show (index));
    //                 };
    //                 case (#Ok(res)) {
    //                     let order : Types.NewOrder = {
    //                         userid = msg.caller;
    //                         shippingAddress = neworder.shippingAddress;
    //                         products = neworder.products;
    //                         totalAmount = neworder.totalAmount;
    //                         subTotalAmount = neworder.subTotalAmount;
    //                         orderStatus = neworder.orderStatus;
    //                         paymentStatus = neworder.paymentStatus;
    //                         paymentAddress = neworder.paymentAddress;
    //                         paymentMethod = neworder.paymentMethod;
    //                         shippingAmount = neworder.shippingAmount;
    //                         awb = neworder.awb;
    //                     };

    //                     let order_status = await createOrder(order);
    //                     switch (order_status) {
    //                         case (#err(index)) {
    //                             return #err(index);
    //                         };
    //                         case (#ok(response)) {
    //                             return #ok(response,#Ok(res));
    //                         };
    //                     };
    //                 };
    //             }; 
    //         };
    //         case (#ckbtc) {
    //             let response : ICRC.Result_2 = await icrc2_transferFrom(ckbtcLedger, from, payment_address, amount);
    //             switch (response) {
    //                 case (#Err(index)) {
    //                     throw Error.reject(debug_show (index));
    //                 };
    //                 case (#Ok(res)) {
    //                     let order : Types.NewOrder = {
    //                         userid = msg.caller;
    //                         shippingAddress = neworder.shippingAddress;
    //                         products = neworder.products;
    //                         totalAmount = neworder.totalAmount;
    //                         subTotalAmount = neworder.subTotalAmount;
    //                         orderStatus = neworder.orderStatus;
    //                         paymentStatus = neworder.paymentStatus;
    //                         paymentAddress = neworder.paymentAddress;
    //                         paymentMethod = neworder.paymentMethod;
    //                         shippingAmount = neworder.shippingAmount;
    //                         awb = neworder.awb;
    //                     };
    //                     let order_status = await createOrder(order);
    //                     switch (order_status) {
    //                         case (#err(index)) {
    //                             return #err(#UnableToCreate);
    //                         };
    //                         case (#ok(response)) {
    //                             return #ok(response,#Ok(res));
    //                         };
    //                     };
    //                 };
    //             };
    //     };

    //     };
    // };


    func icrc2_transferFrom(ledgerId : Text, transferfrom : Principal, transferto : Principal, amount : Nat) : async (ICRC.Result_2) {

        let ledger = actor (ledgerId) : ICRC.Token;
        await ledger.icrc2_transfer_from({
            spender_subaccount = null;
            from = { owner = transferfrom; subaccount = null };
            to = { owner = transferto; subaccount = null };
            amount;
            fee = null;
            memo = null;
            created_at_time = null;
        });
    };

    public func get_exchange_rates( x : XRC.Asset , y : XRC.Asset) : async XRC.GetExchangeRateResult {
        let xrc = actor (exchange_rate_canister) : actor {
            get_exchange_rate : ( GetExchangeRateRequest : XRC.GetExchangeRateRequest ) -> async XRC.GetExchangeRateResult;
        };
        let timestamp = Int.div(Time.now(),1_000_000_000) - 120;
        // 2 mintues buffer time to get the exchange rate
        Debug.print(debug_show(timestamp));
        Cycles.add<system>(10_000_000_000);
        let result = await xrc.get_exchange_rate({timestamp : ?Nat64 = ?Nat64.fromIntWrap(timestamp); quote_asset = x; base_asset = y});
        Debug.print(debug_show(Cycles.refunded()));
        Debug.print(debug_show (result));
        return result;
    };

    public shared (msg) func updateTrackingUrl(id : Types.OrderId, awb : Text) : async Result.Result<(Types.Order), Types.UpdateOrderError> {
        // Check if the caller is an admin
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        let result = orders.get(id);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order_blob = await stable_get(v, order_state);
                let order : ?Types.Order = from_candid(order_blob);
                switch (order) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                    let order : Types.Order = {
                        id = val.id;
                        shippingAddress = val.shippingAddress;
                        products = val.products;
                        userid = val.userid;
                        totalAmount = val.totalAmount;
                        subTotalAmount = val.subTotalAmount;
                        shippingAmount = shippingamount;
                        orderStatus = val.orderStatus;
                        paymentStatus = val.paymentStatus;
                        paymentAddress = val.paymentAddress;
                        paymentMethod = val.paymentMethod;
                        awb = awb;
                        timeCreated = val.timeCreated;
                        timeUpdated = Time.now();
                    };
                    let order_blob = to_candid(order);
                    let index = await update_stable(v, order_blob, order_state);
                    orders.put(id, index);
                return #ok(order);
            };
            };
            };
        };
    };

    public shared (msg) func updateOrderStatus(id : Types.OrderId, orderStatus : Text) : async Result.Result<(Types.Order), Types.UpdateOrderError> {

        // Check if the caller is an admin
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        let result = orders.get(id);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order_blob = await stable_get(v, order_state);
                let order : ?Types.Order = from_candid(order_blob);
                switch (order) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let order : Types.Order = {
                    id = val.id;
                    shippingAddress = val.shippingAddress;
                    products = val.products;
                    userid = val.userid;
                    totalAmount = val.totalAmount;
                    subTotalAmount = val.subTotalAmount;
                    shippingAmount = shippingamount;
                    orderStatus = orderStatus;
                    paymentStatus = val.paymentStatus;
                    paymentAddress = val.paymentAddress;
                    paymentMethod = val.paymentMethod;
                    awb = val.awb;
                    timeCreated = val.timeCreated;
                    timeUpdated = Time.now();
                };
                let order_blob = to_candid(order);
                let index = await update_stable(v, order_blob, order_state);
                orders.put(id, index);
                return #ok(order);
                    };
                };
            };
        };
    };
    // Admin can see all orders
    // 📍📍📍📍📍📍
    public shared (msg) func listallOrders(chunkSize : Nat , pageNo : Nat) : async {data : [Types.Order]; current_page : Nat; total_pages : Nat} {
        // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     throw Error.reject("You are not an admin !") // We require the user to be admin
        // };

        let pages = Utils.paginate<(Types.OrderId, Index)>(Iter.toArray(orders.entries()),chunkSize);
        if (pages.size() < pageNo) {
            throw Error.reject("Page not found");
        };
        if (pages.size() == 0) {
            throw Error.reject("No orders found");
        };
        let pages_data = pages[pageNo];
        var order_list = List.nil<Types.Order>();
        for ((k,v) in pages_data.vals()){
            let order_blob = await stable_get(v, order_state);
            let order : ?Types.Order = from_candid(order_blob);
            switch(order){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    order_list := List.push(val, order_list);
                };
            };
        };
        return { data = List.toArray(order_list); current_page = pageNo + 1; total_pages = pages.size() };
    };

    // Users can see their orders

    // public query (msg) func listUserOrders(chunkSize : Nat , pageNo : Nat) : async [(Types.OrderId, Types.Order)] {
    //     let caller = msg.caller;

    //     // Filter orders to include only those belonging to `caller`
    //     let pages = Utils.paginate<(Types.OrderId, Types.Order)>(Iter.toArray(filteredOrders.entries()),chunkSize);
    //     if (pages.size() < pageNo) {
    //         throw Error.reject("Page not found");
    //     };
    //     if (pages.size() == 0) {
    //         throw Error.reject("No orders found");
    //     };
    //     return pages[pageNo];
    // };

    // get order by id
    public shared func getOrder(orderId : Text) : async Result.Result<Types.Order, Types.OrderError> {
        let order_index = orders.get(orderId);
        switch (order_index) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
        let order_blob = await stable_get(v, order_state);
        let order : ?Types.Order = from_candid(order_blob);
        switch (order) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?val) {
                return #ok(val);
            };
        };
            };
        };
    };
   


    public shared (msg) func deleteOrder(id : Types.OrderId) : async Result.Result<(), Types.DeleteOrderError> {
        if (Principal.isAnonymous(msg.caller)) {
            return #err(#UserNotAuthenticated);
        };

        // Check if the caller is an admin
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        orders.delete(id);
        return #ok(());
    };

    public shared ({ caller }) func getpaymentstatus(orderId : Text) : async Result.Result<Text, Types.GetPaymentStatusError> {

        let result = orders.get(orderId);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order_blob = await stable_get(v, order_state);
                let order : ?Types.Order = from_candid(order_blob);
                switch (order) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return #ok(val.paymentStatus);
                    };
                };
            
            };
        };
    };

    public shared ({ caller }) func updatePaymentstatus(id : Types.OrderId, paymentStatus : Text) : async Result.Result<(Types.Order), Types.UpdatepaymentStatusError> {
        if (Principal.isAnonymous(caller)) {
            return #err(#UserNotAuthenticated);
        };
        // Check if the caller is an admin
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        let result = orders.get(id);
        switch (result) {
            case null {
                return #err(#OrderNotFound);
            };
            case (?v) {
                let order_blob = await stable_get(v, order_state);
                let order : ?Types.Order = from_candid(order_blob);
                switch (order) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let order : Types.Order = {
                    id = val.id;
                    shippingAddress = val.shippingAddress;
                    products = val.products;
                    userid = val.userid;
                    totalAmount = val.totalAmount;
                    subTotalAmount = val.subTotalAmount;
                    shippingAmount = shippingamount;
                    orderStatus = val.orderStatus;
                    paymentStatus = paymentStatus;
                    paymentAddress = val.paymentAddress;
                    paymentMethod = val.paymentMethod;
                    awb = val.awb;
                    timeCreated = val.timeCreated;
                    timeUpdated = Time.now();
                };
                let order_blob = to_candid(order);
                let index = await update_stable(v, order_blob, order_state);
                orders.put(id, index);
                return #ok(order);
            };
                };
            };
        };
    };

    //----------------------------------------------  Contact_Functions  --------------------------------------------------------------------------------//

    public shared func createContact(co : Types.UserContact) : async Result.Result<(Types.Contact), Types.CreateContactError> {

        if (co.name == "") { return #err(#EmptyName) };
        if (co.email == "") { return #err(#EmptyEmail) };
        if (co.message == "") { return #err(#EmptyMessage) };

        let contactId : Types.ContactId = UUID.toText(await g.new());

        let contact : Types.Contact = {
            id = contactId;
            name = co.name;
            email = co.email;
            contact_number = co.contact_number;
            message = co.message;
            time_created = Time.now();
            time_updated = Time.now();
        };
        let contact_blob = to_candid(contact);
        switch (contacts.get(contactId)) {
            case null {
                let contact_index = await stable_add(contact_blob, contact_state);
                contacts.put(contactId, contact_index);
                return #ok(contact);
            };
            case (?v) {
                return #err(#ContactAlreadyExists);
            };
        };
        return #ok(contact);
    };

    public shared (msg) func updateContact(
        id : Types.ContactId,
        read : Bool,
    ) : async Result.Result<(Types.Contact), Types.UpdateContactError> {
        if (Principal.isAnonymous(msg.caller)) {
            return #err(#UserNotAuthenticated);
        };
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        let result = contacts.get(id);
        switch (result) {
            case null {
                return #err(#ContactNotFound);
            };
            case (?v) {
                let contactblob = await stable_get(v, contact_state);
                let contact : ?Types.Contact = from_candid(contactblob);
                switch (contact) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                let contact : Types.Contact = {
                    id = id;
                    email = val.email;
                    name = val.name;
                    contact_number = val.contact_number;
                    message = val.message;
                    read = read;
                    time_created = val.time_created;
                    // only update time_updated
                    time_updated = Time.now();
                };
                return #ok(contact);
            };
        };
            };
        };
    };

    public shared func getContact(id : Types.ContactId) : async Result.Result<Types.Contact, Types.GetContactError> {
        let contact = contacts.get(id);
        switch (contact) {
            case (?v) {
                let contact_blob = await stable_get(v, contact_state);
                let contact : ?Types.Contact = from_candid(contact_blob);
                switch (contact) {
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case (?val) {
                        return #ok(val);
                    };
                };
            };
            case null {
                return #err(#ContactNotFound);
            };
        };
        // If the post is not found, this will return an error as result.
    };

    public shared (msg) func deleteContact(id : Types.ContactId) : async Result.Result<(), Types.DeleteContactError> {

        // Check if the caller is an admin
      // let adminstatus = await isAdmin(msg.caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };
        contacts.delete(id);
        return #ok(());
    };

    public shared ({caller}) func listContacts(chunkSize : Nat , pageNo : Nat) : async {data : [Types.Contact]; current_page : Nat; total_pages : Nat} {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     throw Error.reject("You are not an admin !") 
        // };
        let pages = Utils.paginate<(Types.ContactId, Index)>(Iter.toArray(contacts.entries()),chunkSize);
        if (pages.size() < pageNo) {
            throw Error.reject("Page not found");
        };
        if (pages.size() == 0) {
            throw Error.reject("No contacts found");
        };
        let pages_data = pages[pageNo];
        var contact_list = List.nil<Types.Contact>();
        for ((k,v) in pages_data.vals()){
            let contact_blob = await stable_get(v, contact_state);
            let contact : ?Types.Contact = from_candid(contact_blob);
            switch(contact){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    contact_list := List.push(val, contact_list);
                };
            };
        };
        return { data = List.toArray(contact_list); current_page = pageNo + 1; total_pages = pages.size() };
    };

    // ----------------------------------------Rivew & Ratings functions-------------------------------------------------------------

    // public shared ({ caller }) func addReviewRating(product_slug : Text, review : Text, rating : ?Types.Rating) : async Result.Result<(Types.ReviewRatings), Types.CreateReviewError> {
    //     let userP : Principal = caller;
    //     if (product_slug == "") { return #err(#EmptyProduct_slug) };
    //     switch (products.get(product_slug)) {
    //         case null { return #err(#ProductNotFound) };
    //         case (?v) {
    //             switch (rating) {
    //                 case null { return #err(#EmptyRating) };
    //                 case (?rating) {
    //                     switch (ratingandreviews.get(product_slug)) {
    //                         case null {
    //                             if () {
    //                             };
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 rating = rating;
    //                                 created_by = userP;
    //                                 time_created = Time.now();
    //                                 time_updated = Time.now();
    //                             };
    //                             ratingandreviews.put(product_slug, );
    //                             return #ok(reviewRating);
    //                         };
    //                         case (?v) {
    //                             let reviewRating : Types.ReviewRatings = {
    //                                 product_slug = product_slug;
    //                                 review = review;
    //                                 created_by = userP;
    //                                 rating = rating;
    //                                 time_created = Time.now();
    //                                 time_updated = Time.now();
    //                             };
    //                             List.toArray(List.push(List.fromArray(v), reviewRating));
    //                             ratingandreviews.put(product_slug, v);
    //                             return #ok(reviewRating);
    //                         };
    //                     };
    //                 };
    //             };
    //         };
    //     };
    // };


    public shared ({ caller }) func getstatisticaldetailforadmin() : async Result.Result<(Types.StatisticalDetail), Types.GetStatisticalDetailError> {
        // let adminstatus = await isAdmin(caller);
        // if (adminstatus == false) {
        //     return #err(#UserNotAdmin); // We require the user to be admin
        // };

        let totalOrders = Iter.toArray(orders.entries()).size();
        let totalProducts = Iter.toArray(products.entries()).size();
        let totalCategories = Iter.toArray(categories.entries()).size();
        let totalUsers = Iter.toArray(usersaddresslist.entries()).size();
        let totalContacts = Iter.toArray(contacts.entries()).size();

        let statisticalDetail : Types.StatisticalDetail = {
            totalOrders = totalOrders;
            totalProducts = totalProducts;
            totalCategories = totalCategories;
            totalUsers = totalUsers;
            totalContacts = totalContacts;
        };
        return #ok(statisticalDetail);
    };


    // public func get_trusted_origins() : async [Text] {
    // ["https://ez3it-6qaaa-aaaak-akwyq-cai.icp0.io","http://localhost:3000","http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943","http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai","http://127.0.0.1:4943","https://ryjl3-tyaaa-aaaaa-aaaba-cai.icp0.io", "https://mxzaz-hqaaa-aaaar-qaada-cai.icp0.io"]
    // };
};
