IP_ADDR 			:= 127.0.0.1
SSO_SERVER_DOMAIN	:= sso.company.com
SSO_CONSUMER_DOMAIN	:= consumer.one.company.com

.PHONY: add-domains remove-domains start consumer sso

etc-hosts:
	@./scripts/manage-etc-hosts.sh $(action) $(ip) $(domain)

add-hosts:
	@make etc-hosts action=add ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=add ip=$(IP_ADDR) domain=$(SSO_CONSUMER_DOMAIN)

remove-hosts:
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=$(SSO_CONSUMER_DOMAIN)

start:
	@npm run --prefix $(f) start

consumer:
	@make start f=./src/sso-consumer

sso:
	@make start f=./src/sso-server
