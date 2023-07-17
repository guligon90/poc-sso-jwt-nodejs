ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Colors
GREEN 	:= $(shell tput -Txterm setaf 2)
WHITE 	:= $(shell tput -Txterm setaf 7)
YELLOW	:= $(shell tput -Txterm setaf 3)
RED 	:= $(shell tput -Txterm setaf 1)
RESET 	:= $(shell tput -Txterm sgr0)

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_FUN = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	    print "usage: make [target]\n\n"; \
    	for (sort keys %help) { \
    		print "${WHITE}$$_:${RESET}\n"; \
    		for (@{$$help{$$_}}) { \
    			$$sep = " " x (32 - length $$_->[0]); \
    			print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    		}; \
    	print "\n"; \
	}

# Consumer and SSO services parameters
IP_ADDR 			:= 127.0.0.1
SSO_SERVER_DOMAIN	:= sso.company.com
SSO_SERVER_PORT		:= 3010

.PHONY: help \
	etc-hosts \
	add-hosts \
	remove-hosts \
	start \
	consumer \
	sso

help: ##@other Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

etc-hosts: ## Edit the local /etc/hosts file, given an action=<add | remove>, ip=<address> and a domain=<some.domain.com>.
	@./scripts/manage-etc-hosts.sh $(action) $(ip) $(domain)

add-hosts: ## Add predefined hosts.
	@make etc-hosts action=add ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=add ip=$(IP_ADDR) domain=app.one.company.com
	@make etc-hosts action=add ip=$(IP_ADDR) domain=app.two.company.com
	@make etc-hosts action=add ip=$(IP_ADDR) domain=app.three.company.com
	@make etc-hosts action=add ip=$(IP_ADDR) domain=app.four.company.com

remove-hosts: ## Remove predefined hosts.
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=app.one.company.com
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=app.two.company.com
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=app.three.company.com
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=app.four.company.com

diagrams: ## Run the Mermaid CLI, given an action=<generate | destroy> and a format=<png | svg | ...>
	@./scripts/generate-diagrams.sh $(action) $(format)

start: ## Start a Node.js application, given a string of args=<"--some --value=foo --parameter=123">.
	@npm run --prefix $(f) start -- "$(args)"

consumer: ## Start a consumer app instance, given a number=<one | two | three | four> and a TCP port=<number>.
	@make start f=./src/sso-consumer args="--hostname=app.$(number).company.com --port=$(port)"

sso: ## Start a SSO app instance.
	@make start f=./src/sso-server args="--hostname=$(SSO_SERVER_DOMAIN) --port=$(SSO_SERVER_PORT)"

listen: ## List all TCP ports that are been listened to by the instantiated Node.js services.
	@lsof -iTCP -sTCP:LISTEN -P -n | grep node
