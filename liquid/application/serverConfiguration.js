liquid.pulse('local', function() {
    liquid.liquidControllers = {
        'index': 'LiquidPage',
        'test': createTestPage,
        // 'test': create,
        'someurl/:someargument' : 'PageWithArgument'
    };

    /***
     * Setup some test data
     */

// !function addTestData() {
// User
    var user = create('User', {name: "Walter", email: "some.person@gmail.com", password: "liquid"});
    liquid.addToLocalRegistry(user);

    trace('setup', 'created user: ', user);

// Create categories
    var favourite = create('Category', {name: 'Favourite', description: '', owner: user});

    var funny = create('Category', {name: 'Funny', description: '', owner: user});

    var politics = create('Category', {name: 'Politics', description: '', owner: user});

    var georgism = create('Category', {name: 'Georgism', description: '', owner: user});
    politics.addSubCategory(georgism);


    setTimeout(function() {
        liquid.pulse('local', function() {

            var myPolitics = create('Category', {name: 'MyPoliticalCommitments', description: '', owner: user});
            politics.addSubCategory(myPolitics);

            var directDemocracy = create('Category', {name: 'Direct Democracy', description: '', owner: user});
            politics.addSubCategory(directDemocracy);

            var liquidDemocracy = create('Category', {name: 'Liquid Democracy', description: '', owner: user});
            directDemocracy.addSubCategory(liquidDemocracy);

            var direktdemokraterna = create('Category', {name: 'Direktdemokraterna', description: '', owner: user});
            liquidDemocracy.addSubCategory(direktdemokraterna);
            myPolitics.addSubCategory(direktdemokraterna);
        });
    }, 10000);

// Create References
    var created = 0;
    while (created++ < 3) {
        var reference1 = create('Reference', {url : 'http://foo.com/' + created, owner: user, categories: [georgism]});
    }

    trace('setup', "Users categories: ", user.getOwnedCategories());

    // return;


// created = 0;
// while (created++ < 10) {
    // var reference2 = create('Reference', {url : 'http://fie.com/' + created, user: user, categories:[georgism, liquidDemocracy]});
// }
// created = 0;
// while (created++ < 10) {
    // var reference3 = create('Reference', {url : 'http://fum.com/' + created, user: user, category: direktdemokraterna});
// }
// created = 0;
// while (created++ < 10) {
    // var reference4 = create('Reference', {url : 'http://foobarkazong.com/'  + created, user: user, category: direktdemokraterna});
// }
// }();

    function createTestPage(req) {
        var session = liquid.createOrGetSessionObject(req);
        // session.setUser(user);
        var page = create('LiquidPage', {Session: session});
        page.getPageService().addOrderedSubscription(create('Subscription', {object: user, selector:'all'})); //object: user,
        return page;
    }



// module.exports = {
//     test : function (user, session, page) {
//         console.log("Request page 'init'");
//         liquid.clearDatabase();
//
//         var somePerson = liquid.findEntity({className: 'User'});
//
//         var favourite = createPersistent('Category', {name: 'Favourite', description: '', user: user});
//         favourite.persist();
//         // createPersistent('PersistentSelection', {object: favourite, selection: "object"});
//
//         // favourite.persist();
//
//         // page.subscribeTo(favourite);
//         // return {}
//     }
// };
});