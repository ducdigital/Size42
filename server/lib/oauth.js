isProdEnv = function () {
    return false;
}

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 /* 
ServiceConfiguration.configurations.remove({
    service: 'twitter'
});
 
ServiceConfiguration.configurations.remove({
    service: 'github'
});
 */
if (isProdEnv()) {
  /*
    ServiceConfiguration.configurations.insert({
        service: 'github',
        clientId: '00000',
        secret: '00000'
    });
    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: '00000',
        secret: '00000'
    });
    ServiceConfiguration.configurations.insert({
        service: 'google',
        appId: '00000',
        secret: '00000'
    });
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '00000',
        secret: '00000'
    });
  */
} else {
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '99597858936-8e5nrepfse8ijevnm08te0dm5iatflbc.apps.googleusercontent.com',
        secret: '0MVhynxJH5zRMrssWS9c0msg'
    });
    /*
    // dev environment
    ServiceConfiguration.configurations.insert({
        service: 'github',
        clientId: '11111',
        secret: '11111'
    });
    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: '11111',
        secret: '11111'
    });
    */
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '272333686272028',
        secret: '0f73aa0195e02f20694025488e249fe7'
    });
}

Accounts.onCreateUser(function (options, user) {
    if (user.services) {
        var service = _.keys(user.services)[0];
        var email = user.services[service].email;

        if (options.profile) {
            if(service == "facebook")
                options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
            user.profile = options.profile
        }
        if (!email) {
            if (user.emails) {
                email = user.emails.address;
            }
        }
        if (!email) {
            email = options.email;
        }
        if (!email) {
            // if email is not set, there is no way to link it with other accounts
            return user;
        }
        
        // see if any existing user has this email address, otherwise create new
        var existingUser = Meteor.users.findOne({'emails.address': email});
        if (!existingUser) {
            // check for email also in other services
            var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
            var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
            var existingTwitterUser = Meteor.users.findOne({'services.twitter.email': email});
            var existingFacebookUser = Meteor.users.findOne({'services.facebook.email': email});
            var doesntExist = !existingGitHubUser && !existingGoogleUser && !existingTwitterUser && !existingFacebookUser;
            if (doesntExist) {
                // return the user as it came, because there he doesn't exist in the DB yet
                return user;
            } else {
                existingUser = existingGitHubUser || existingGoogleUser || existingTwitterUser || existingFacebookUser;
                if (existingUser) {
                    if (user.emails) {
                        // user is signing in by email, we need to set it to the existing user
                        existingUser.emails = user.emails;
                    }
                }
            }
        }
 
        // precaution, these will exist from accounts-password if used
        if (!existingUser.services) {
            existingUser.services = { resume: { loginTokens: [] }};
        }
 
        // copy accross new service info
        existingUser.services[service] = user.services[service];
        if(typeof user.services.resume != "undefined"){
          existingUser.services.resume.loginTokens.push(
              user.services.resume.loginTokens[0]
          );
        }
 
        // even worse hackery
        Meteor.users.remove({_id: existingUser._id}); // remove existing record
        return existingUser;    		      // record is re-inserted
    }
});
