Shares = new Meteor.Collection('shares');

if(Meteor.isServer){
	Meteor.methods({
		verifyShare: function(id) {
			var share = Shares.findOne({_id: id});
			if(!share) return -1;
			if(!Meteor.userId()) return false;
			else {
				Meteor.call("linkProfiletoUser", Meteor.userId(), share.profile);
				Shares.remove({_id: share._id});
				return true;
			}
		},

		shareProfile: function(profile_id){
			var id = CryptoJS.MD5(Math.random()+' '+profile_id).toString();
			Shares.insert({
				'profile': profile_id,
				'_id': id
			});
			return process.env.ROOT_URL+"/share/"+id;
		}
	});
}