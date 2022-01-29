// SPDX-License-Identifier: MIT
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity >=0.4.22 <0.9.0;

contract PostStorage{

    /*
    -------------------------
    ---------STRUCTS---------
    -------------------------
    */
    struct Post{
        string content;
        uint likes;
        uint timestamp;
    }

    struct Account{
        string username;
        Post[] posts;
    }

    /*
    -------------------------
    ---------STORAGE---------
    -------------------------
    */
    mapping(address => Account) private _accounts;
    uint totalPosts = 0;
    uint totalLikes = 0;

    /*
    -------------------------
    -----USER OPERATIONS-----
    -------------------------
    */
    function getUsername(address _userAddress) public view returns(string memory) {
        return _accounts[_userAddress].username;
    }

    function setUsername(string memory _username)public {
        _accounts[msg.sender].username = _username;
    }


    /*
    -------------------------
    -----POST OPERATIONS-----
    -------------------------
    */
    function insertPost(string memory _content)public {
        _accounts[msg.sender].posts.push(Post(_content, 0, block.timestamp));
        totalPosts++;
    }

    function getPosts(address _address)public view returns(Post[] memory){
        return _accounts[_address].posts;
    }
    
    function getPost(address _address, uint _postIndex) public view returns(Post memory) {
        return _accounts[_address].posts[_postIndex];
    }

    function likePost(address _address, uint _postIndex) public {
        uint postLikes = _accounts[_address].posts[_postIndex].likes;
        _accounts[_address].posts[_postIndex].likes = postLikes + 1;
        totalLikes++;
    }

}

/*
"How are you today ?"
*/