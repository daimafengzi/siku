//Cookie和x-Tt-Token去抓到的headers里搜
let cookies = [
    {
        "name": "账号1",
        "Cookie": "d_ticket=d6c024a3f17a4ecb9e2437e10e9c8687b5682; n_mh=dPaLfxoBO-ddskQ6XX5RyW4eChTvJgWOugN32Gz0JSg; odin_tt=39e7d7cae0790a6f5b2051b1e593f26fa3fccd708326763584f30baae6788c67f642cf7f17f2d15f17365d63a5d7aa1f9e03b56ffea3aea0852d3f469e1db716; sessionid=1f561d5ad3a666cb6136b74aa97aceb4; sessionid_ss=1f561d5ad3a666cb6136b74aa97aceb4; sid_guard=1f561d5ad3a666cb6136b74aa97aceb4%7C1639674789%7C5184000%7CMon%2C+14-Feb-2022+17%3A13%3A09+GMT; sid_tt=1f561d5ad3a666cb6136b74aa97aceb4; uid_tt=ec2a04fe5a2854a2d1491691c43c9f09; uid_tt_ss=ec2a04fe5a2854a2d1491691c43c9f09; passport_csrf_token=757f1727664dde39772022f9fffe62aa; passport_csrf_token_default=757f1727664dde39772022f9fffe62aa; install_id=4143422447571646; ttreq=1$b9ddad6b9e826c3bdaaf06576b90b55252ddbd6e",
        "x-Tt-Token": "001f561d5ad3a666cb6136b74aa97aceb403669502cc8c44841986e4a24164a701562d9bd1053a3b5a8aa2932f8dd52d747dc7dea971bf9f860c54f759685ce4482438c50d50216d412b5b89d3fb94edf3c94c0853d629b795a46af7866d7a5c2cde2-1.0.1"
    },
	{
        "name": "账号2",
        "Cookie": "passport_csrf_token=81a520adfa369066cd48efda9ab9b071; passport_csrf_token_default=81a520adfa369066cd48efda9ab9b071; d_ticket=663ee83cb32f7d029e68e964cabccf6762f20; n_mh=KytbTSvRJFJr99sKwhWjlJiUahlp-CfK3OF-Xiz5kho; odin_tt=0397d6a6449661d44ae828416218a791c3f0021549a4625f2b33b7997efc014a63d04fba4c34864d48de23d5b31f31c40e8fc63af50e31b65f92c2595b08ac7a83fac75d3e4f4f459fb4ce6bbec0b87c; sessionid=375243a9cac29a8e2cdf762274465a6f; sessionid_ss=375243a9cac29a8e2cdf762274465a6f; sid_guard=375243a9cac29a8e2cdf762274465a6f%7C1641469240%7C5184000%7CMon%2C+07-Mar-2022+11%3A40%3A40+GMT; sid_tt=375243a9cac29a8e2cdf762274465a6f; uid_tt=9ff5b65c54069091a114e5e0f43e58a6; uid_tt_ss=9ff5b65c54069091a114e5e0f43e58a6; MONITOR_WEB_ID=68561575930; install_id=4354536029559672; ttreq=1$e27ab366c074896543cae968869fc437d33670b4",
        "x-Tt-Token": "00375243a9cac29a8e2cdf762274465a6f01a01ab080b53e929d689874f890f94e7eea4ad3ce53adf3be69d4107e4daab958e1b546d264b1baf81c4c84886affd1182372cb76e4144f6143ad865bdefc3faa385bf0298e54a77062df92ab38d3c5eaa-1.0.1"
    }
];

module.exports = cookies;
