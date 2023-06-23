ROOT_DIR			:= $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
IP_ADDR 			:= 127.0.0.1
SSO_SERVER_DOMAIN	:= sso.company.com
SSO_CONSUMER_DOMAIN	:= consumer.one.company.com

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

.PHONY: help add-domains remove-domains start consumer sso

.DEFAULT_GOAL := help

help: ##@other Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

etc-hosts: ## Manipulate the /etc/hosts file, given an action=<add | remove>, an ip and a domain.
	@./scripts/manage-etc-hosts.sh $(action) $(ip) $(domain)

add-hosts: ## Add pre defined SSO and consumer hosts
	@make etc-hosts action=add ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=add ip=$(IP_ADDR) domain=$(SSO_CONSUMER_DOMAIN)

remove-hosts: ## Remove predefined SSO and consumer hosts
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=$(SSO_SERVER_DOMAIN)
	@make etc-hosts action=remove ip=$(IP_ADDR) domain=$(SSO_CONSUMER_DOMAIN)

start: ## Start a Node.js service, given a prefix=<path/to/nodejs/project>
	@npm run --prefix $(prefix) start

consumer: ## Start the consumer service
	@make start prefix=./src/sso-consumer

sso: ## Start the SSO service
	@make start prefix=./src/sso-server

diagrams: ## Run the Mermaid CLI, given an action=<generate | destroy> and a format=<png | svg | ...>
	@./scripts/generate-diagrams.sh $(action) $(format)
