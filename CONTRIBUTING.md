# Contributing to the Mercado Pago NodeJS SDK

Thank you for your interest in contributing to the Mercado Pago NodeJS SDK!

## How to contribute

In order to contribute to the Mercado Pago NodeJS SDK effectively we provide guidelines to address common case for
contributions. Presently we have guides for the following type of changes.

* Request For Change (RFC) / Feature Request: These are suggestions / requests for features the SDK currently does not
  have. The SDK team evaluates these requests for adequacy / relevance / capacity and overall architectural consistency.
* Bug Reports: These are reports of noncompliance behavior with the SDK specification and other blatantly wrong behavior of the Mercado Pago NodeJS SDK.

In addition to contributing in the form of Bug Reports and RFCs it is also possible to contribute directly in code with
a Pull Request (PR). In the case of a Pull Request you should also indicate the nature of the Pull Request (
Feature/Bug/etc.) to help the team asses the Pull Request. If you are enthusiastic about a particular Feature being
added or a bug being fixed, a PR is often the quickest way to promote your change as the team does not have to allocate
as many resources to process the contribution.

In the case of PRs it is often best to consult with the SDK team before embarking on a PR, specially if it's a beefy
one. Spending time on a PR that might later be rejected because major discrepancies with vision or competing
contributions is an uncomfortable outcome for all involved people. Remember the SDK team with privilege overall
consistency and progress over any one particular contribution.

## Coding Guidance

All contributions *MUST* follow the [Coding Guidelines](CODING_GUIDELINES.md). Contributions that fail to follow these
guidelines will be disregarded and told to make the required modifications to do so.

## Request For Change / Feature Request

Generally speaking an RFC is needed when you want to add a new feature or change an existing one in an incompatible way
that might result in a major version bump to the toolkit.

Though it seems a little bureaucratic, the process is in place in order to avoid frustration of a potential contributor
by making the discussions take place before any code is written. Once the design and direction is fully agreed then the
contributor can work peacefully knowing that their change will be committed.

Please prepend your issue title with `[RFC]` so that's easier to filter.

## Bug Reports

Bugs are a reality in software. We can't fix what we don't know about, so please report liberally. If you're not sure if
something is a bug or not, feel free to file it anyway.

Before reporting a bug, please search existing issues and pull requests, as it's possible that someone else has already
reported your error. In the off case that you find your issue as fixed/closed, please add a reference to it on your new
one.

Your issue should contain a title and a clear description of the issue. You should also include as much relevant
information as possible, and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for
yourself - and others - to replicate the bug and develop a fix.

Opening an issue is as easy as
following [this link](https://github.com/mercadopago/sdk-nodejs/issues/new?assignees=&labels=&template=bug_report.md) and
filling out the given template.

Bug reports may also be sent in the form of a [pull request](#pull-request) containing a failing test.

## Pull Request

First and foremost: Source code, documentation, commit messages, review comments, and any other kind of contribution
must *MUST* follow the [Coding Guidelines](CODING_GUIDELINES.md).

We use the "fork and pull"
model [described here](https://help.github.com/articles/about-collaborative-development-models/), where contributors
push changes to their personal fork and create pull requests to bring those changes into the source repository.

Your basic steps to get going:

* Fork the corresponding toolkit repository and create a branch from master for the issue you are working on.
* Commit as you go following our git conventions.
* Include tests that cover all non-trivial code. The existing tests should provide a template on how to test the toolkit
  correctly.
* Make sure all test passes.
* All code changes are expected to comply with the formatting style.
* Push your commits to GitHub and create a pull request against the corresponding toolkit component master branch.

If taking too much time to deliver code, **always** [rebase](https://git-scm.com/docs/git-rebase) towards `master` before
asking for a review, and avoid reverse merge commits.