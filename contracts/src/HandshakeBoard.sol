// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title HandshakeBoard
/// @notice A minimal public job board that lives beside HandshakeRegistry:
///         freelancers post availability, clients post work. Listing text is
///         stored onchain (v1 has no backend and hashes can't be shared
///         between browsers) — fine at this scale, and it keeps the whole
///         product readable from public state alone. The point of the board
///         is the pairing: every poster's wallet links to their payment
///         history and Handshake Score in the registry.
contract HandshakeBoard {
    enum Kind {
        OfferingWork, // freelancer looking for clients
        Hiring // client looking for freelancers
    }

    struct Listing {
        address poster;
        Kind kind;
        string title;
        string details;
        uint256 rateCents; // CAD cents, informational (0 = negotiable)
        uint64 postedAt;
        bool active;
    }

    uint256 public constant MAX_TITLE_BYTES = 80;
    uint256 public constant MAX_DETAILS_BYTES = 400;

    Listing[] private _listings;

    event ListingPosted(
        uint256 indexed id, address indexed poster, Kind kind, string title
    );
    event ListingClosed(uint256 indexed id, address indexed poster);

    error UnknownListing();
    error NotPoster();
    error AlreadyClosed();
    error EmptyTitle();
    error TitleTooLong();
    error DetailsTooLong();

    function post(Kind kind, string calldata title, string calldata details, uint256 rateCents)
        external
        returns (uint256 id)
    {
        if (bytes(title).length == 0) revert EmptyTitle();
        if (bytes(title).length > MAX_TITLE_BYTES) revert TitleTooLong();
        if (bytes(details).length > MAX_DETAILS_BYTES) revert DetailsTooLong();

        id = _listings.length;
        _listings.push(
            Listing({
                poster: msg.sender,
                kind: kind,
                title: title,
                details: details,
                rateCents: rateCents,
                postedAt: uint64(block.timestamp),
                active: true
            })
        );
        emit ListingPosted(id, msg.sender, kind, title);
    }

    function close(uint256 id) external {
        if (id >= _listings.length) revert UnknownListing();
        Listing storage l = _listings[id];
        if (msg.sender != l.poster) revert NotPoster();
        if (!l.active) revert AlreadyClosed();
        l.active = false;
        emit ListingClosed(id, msg.sender);
    }

    function getListings(uint256 fromId, uint256 toId)
        external
        view
        returns (Listing[] memory page)
    {
        if (toId > _listings.length) toId = _listings.length;
        if (fromId >= toId) return new Listing[](0);
        page = new Listing[](toId - fromId);
        for (uint256 i = fromId; i < toId; ++i) {
            page[i - fromId] = _listings[i];
        }
    }

    function listingCount() external view returns (uint256) {
        return _listings.length;
    }
}
