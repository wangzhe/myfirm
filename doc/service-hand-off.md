#Service hand off

##Content

###Fragment
A general fragment document.
a fragment is basically contains four elements

|**Element name**|**Description**|
|:-----------|:-----------|
|:type | the type of this document, normally like "application/vnd.myfirm.*.fragment+xxx" |
|:uid | the id of this document |
|link | document url link or redirect personalized doc url |
|items | a number of items refer to action |
|content | simple key value documents |

```
{
	":type": "application/vnd.myfirm.fragment+json",
	":uid": "fragment-welcome",
    "link": {
      ":self": "https://localhost:8080/non_personal_hello",
      "href": "https://localhost:9132/hello?token={token:platform}",
      "type": "text/json"
    },
	"items": [
		{
			":uid": "profile-provider"
			"display": {
				"icon": "http://localhost:8081/res/login.png",
				"text": "Login"
			}
			"navigation": {
				":type": "application/vnd.myfirm.extension.profile.fragment+json",
				":uid": "profile-fragment-welcome",
				"items": [
					{
						":uid": "profile-login"
						"display": {
							"icon": "http://localhost:8081/res/login_button.png"
						}
						"navigation": {
							":type": "application/vnd.myfirm.extension.profile.login.url+json",
							"herf": "http://localhost:8081/users/me/token?u={user}&pwd={pwd},
						}
					}
				]
			}
		},
		{
			":uid": "product-provider"
			"display": {
				"icon": "http://localhost:8082/res/product.png",
				"text": "Firm Product"
			}
			"navigation": {
				":type": "application/vnd.myfirm.extension.product.url+json",
				"herf": "http://localhost:8082/product/list?token={token:product-token}
			}
		}
	]
}
```



###Profile
```
{
	":type": "application/vnd.myfirm.extension.profile.fragment+json",
    "link": {
      ":self": "https://localhost:9132/non_personal_hellohahaha",
      "href": "https://localhost:9132/hello",
      "type": "text/json"
    },
    content: {
		""name": "Jack",
		"company": "ThoughtWorks Software Technologies Ltd.",
		"title": "Consultant",
		"address": "Room1105, Floor GuoHua Plaza, No.3 Dongzhimen South Street, Dongcheng District, Beijing, China 100007",
		"tel": "+86 10 6407 6695",
		"mobile": "+86 18611758973",
		"email": "zwang@thoughtworks.com"
	},
	"items": [
		{	
			":uid": "profile-update"
			"display": {
				"text": "update"
			}
			"type": "application/vnd.myfirm.extension.profile.content+json",
			"href": "https://localhost:9132/hello",
		},
		"act": {
			"type": "application/vnd.myfirm.extension.profile.content+json",
			"href": "https://localhost:9132/hello",
		}
	]
}
```

###Product
```
{
	":type": "application/vnd.myfirm.extension.product.list+json",
    "link": {
      ":self": "https://localhost:9132/non_personal_hellohahaha",
      ":href": "https://localhost:9132/hello",
      ":type": "text/json"
    }
	"actions": [
		"save-to": {
			"type": "application/vnd.myfirm.extension.product.list+json",
		}
	]
}
```