// types.mo
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
module {
    public type Index = Nat64;

    public type ProductId = Nat;
    // Slug is a unique identifier for a product
    public type SlugId = Text;
    public type WishlistId = Text;
    public type RId = Text;

    public type User = {
        id : Principal;
        firstName : Text;
        lastName : Text;
        email : Text;
    };

        public type CreateUserError = {
            #UserAlreadyExists;
            #EmptyEmail;
            #EmptyFirstName;
            #EmptyLastName;
        };

        public type AdminStatusError = {
            #UserNotAdmin;
        };

    public type UpdateUserError = {
        #UserNotAuthenticated;
        #UserNotFound;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type GetUserError = {
        #UserNotFound;
    };

    public type CreateProductError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyTitle;
        #CategoryNotFound;
    };

    public type GetProductError = {
        #ProductNotFound;
    };

    public type UpdateProductError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyTitle;
        #ProductNotFound;
    };

    public type DeleteProductError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type CreateCategoryError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #CategoryAlreadyExists;
    };

    public type UpdateCategoryError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #CategoryNotFound;
    };

    public type DeleteCategoryError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type GetCategoryError = {
        #CategoryNotFound;
    };

    public type CreateReviewError = {
        #EmptyProduct_slug;
        #UserNotAuthenticated;
        #EmptyReview;
        #ProductNotFound;
        #EmptyProduct;
        #EmptyRating;

    };
    // TODO: payments error is what we will be deailing with here so implement that

    public type Rating = {
        #onestar;
        #twostar;
        #threestar;
        #fourstar;
        #fivestar;
    };

    public type ShippingAmount = {
        shipping_amount : Float;
    };

    public type UpdateShippingAmountError = {
        #UserNotAdmin;
        #EmptyShippingAmount;
    };

    public type ReviewRatings = {
        product_slug : SlugId;
        rating : Rating;
        review : Text;
        created_by : Principal;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type UserAddress = {
        address_type : Text;
        firstname : Text;
        lastname : Text;
        email : Text;
        phone_number : Text;
        addressline1 : Text;
        addressline2 : Text;
        city : Text;
        pincode : Text;
        state : Text;
        country : Text;
    };

    public type Address = UserAddress and {
        id : Text;
    };

    public type addressobject = {
        userprincipal : Principal;
        addresslist : List.List<Address>;
    };

    public type CreateAddressError = {
        #UserNotAuthenticated;
        #EmptyFirstName;
        #EmptyLastName;
        #EmptyEmail;
        #EmptyPhoneNumber;
        #EmptyAddressLine1;
        #EmptyCity;
        #EmptyPincode;
        #EmptyState;
        #EmptyCountry;
        #AddressAlreadyExists;
    };

    public type UpdateAddressError = {
        #UserNotAuthenticated;
        #EmptyFirstName;
        #EmptyLastName;
        #EmptyEmail;
        #EmptyPhoneNumber;
        #EmptyAddressLine1;
        #EmptyCity;
        #EmptyPincode;
        #EmptyState;
        #EmptyCountry;
        #AddressNotFound;
    };

    public type GetAddressError = {
        #AddressNotFound;
    };

    public type DeleteAddressError = {
        #UserNotAuthenticated;
        #AddressNotFound;
    };

    public type OrderError = {
        #MissingData;
        #PaymentAddressAlreadyUsed;
        #UnableToCreate;
        #OrderNotFound;
        #UnableToUpdate;
        #UserNotAuthenticated;
        #PaymentFailed;
    };

    public type Category = {
        name : Text;
        slug : SlugId;
        category_img : Text;
        featured : Bool;
        active : Bool; 
    };

    public type VariantSize = {
        size : Text;
    };

    public type VariantColor = {
        color : Text;
        img1 : Text;
        img2 : Text;
        img3 : Text;
        variant_price : Float;
        variant_sale_price : Float;
        inventory : Nat;
    };

    // User input data for products

    public type UserProduct = {
        title : Text;
        //price : Float;
        //sellingPrice : Float;
        description : Text;
        category : SlugId;
        active : Bool;
        newArrival : Bool;
        trending : Bool;
    };
    // Backend data for products
    public type Product = UserProduct and {
        //img : Text; // Upload 3 images for each product
        id : ProductId;
        slug : SlugId;
        variantSize : [VariantSize];
        variantColor : [VariantColor];
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type Variants = {
        variant_slug : SlugId;
        product_slug : SlugId;
        size : Text;
        color : Text;
        variant_price : Float;
        variant_sale_price : Float;
        inventory : Nat;
    };

    public type DeleteVariantError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #VariantNotFound;
    };

    public type UpdateVariantError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptySize;
        #EmptyColor;
        #EmptyProductSlug;
        #ProductSlugNotFound;
        #VariantNotFound;
    };

    public type GetVariantError = {
        #VariantNotFound;
    };

    public type CreateVariantError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptySize;
        #EmptyColor;
        #EmptyProductSlug;
        #ProductSlugNotFound;
        #VariantSlugAlreadyExists;
    };

    public type OrderId = Text;
    public type OrderProduct = {
        id : Text;
        title : Text;
        img : Text;
        quantity : Nat8;
        size : Text;
        color : Text;
        sale_price : Float;
    };
    // TODO: show the price in the order a argument
    public type NewOrder = {
        shippingAddress : Address;
        products : [OrderProduct];
        paymentAddress : Text;
        userid : Principal;
        totalAmount : Float;
        subTotalAmount : Float;
        shippingAmount : ShippingAmount;
        paymentMethod : Text;
        orderStatus : Text;
        paymentStatus : Text;
        awb : Text;
    };

    public type PaymentStatus = {
        #Pending;
        #Failed;
        #Success;
    };

    public type GetPaymentStatusError = {
        #OrderNotFound;
    };

    public type Order = NewOrder and {
        id : OrderId;
        timeCreated : Time.Time;
        timeUpdated : Time.Time;
    };

    public type OrderStatus = {
        #UserConfirmedPayment;
        #TransactionIdSet;
        #Verified;
    };

    public type UpdateOrderError = {
        #OrderNotFound;
        #UserNotAuthenticated;
        #UserNotAdmin;
    };

    public type UpdatepaymentStatusError = {
        #OrderNotFound;
        #UserNotAuthenticated;
        #UserNotAdmin;
    };

    public type HeaderField = (Text, Text);

    public type StreamingStrategy = {
        #Callback : {
            callback : StreamingCallback;
            token : StreamingCallbackToken;
        };
    };

    public type StreamingCallback = query (StreamingCallbackToken) -> async (StreamingCallbackResponse);

    public type StreamingCallbackToken = {
        content_encoding : Text;
        index : Nat;
        key : Text;
    };

    public type StreamingCallbackResponse = {
        body : Blob;
        token : ?StreamingCallbackToken;
    };

    public type Request = {
        body : Blob;
        headers : [HeaderField];
        method : Text;
        url : Text;
    };

    public type Response = {
        body : Blob;
        headers : [HeaderField];
        streaming_strategy : ?StreamingStrategy;
        // ata.status_code : Nat16;
    };

    public type PanelInfo = {
        ordersCount : Nat;
        // totalRevenue : BitcoinApiTypes.Satoshi;
        // accountBalance : BitcoinApiTypes.Satoshi;
    };

    // public type Size = {
    //     title : Text;
    //     slug : SlugId;
    //     short : Text;
    // };

    // public type Color = {
    //     title : Text;
    //     slug : SlugId;
    //     color : Text;
    // };
    // Cart Items

    // User input data for products

    // Backend data for products

    public type CartItem = {
        product_slug : Text;
        size : Text;
        color : Text;
        quantity : Nat8;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type cartItemobject = {userprincipal : Principal;cartItemlist : List.List<CartItem>;};

    public type CreateCartItemsError = {
        #UserNotAuthenticated;
        #EmptyColor;
        #EmptySize;
        #EmptyProductSlug;
        #ProductSlugAlreadyExists;
        #UserNotAdmin;
        #CartItemAlreadyExists;
    };

    public type GetCartItemsError = {
        #CartItemNotFound;
    };

    public type UpdateCartItemsError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #CartItemNotFound;
        #CartisEmpty;
    };

    public type DeleteCartItemsError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
        #CartisEmpty;
        #CartItemNotFound
    };

    // WishList
    public type CreateWishlistItemError = {
        #UserNotAuthenticated;
        #EmptyProductSlug;
        #WishlistItemAlreadyExists;
        #UserNotAdmin;
    };

    public type GetWishlistItemError = {
        #WishlistItemNotFound;
    };

    public type UpdateWishlistItemError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #WishlistItemNotFound;
    };

    public type DeleteWishlistItemError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
        #WishlistItemNotFound;
        #listisempty;
    };

    public type WishlistItem = {
        product_slug : Text;
        size : Text;
        color : Text;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type wishlistItemobject = {
        userprincipal : Principal;
        wishlistItem : List.List<WishlistItem>;
    };

    // Order

    public type DeleteOrderError = {
        #OrderNotFound;
        #UserNotAuthenticated;
        #UserNotAdmin;
    };

    // Contact US (Deatils of the user who wants to contact us)

    public type ContactId = Text;

    public type UserContact = {
        name : Text;
        email : Text;
        message : Text;
        contact_number : Text;
    };

    public type Contact = UserContact and {
        id : ContactId;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type CreateContactError = {
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
        #ContactAlreadyExists;
    };

    public type GetContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #ContactNotFound;
    };

    public type DeleteContactError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type UpdateContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
        #ContactNotFound;
    };

    public type StatisticalDetail = {
        totalOrders : Nat;
        totalProducts : Nat;
        totalCategories : Nat;
        totalUsers : Nat;
        totalContacts : Nat;
    };

    public type GetStatisticalDetailError = {
        #UserNotAdmin;
    };

};
