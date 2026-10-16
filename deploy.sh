#!/usr/bin/env bash
#
# Manual production deploy for the DATA IESB site-frontend.
# Mirrors .github/workflows/deploy-prod.yml (S3 sync + clean route objects + CloudFront invalidation).
#
# Prerequisites:
#   - A production build already exists in ./out (run `npm run build` first).
#   - AWS credentials with access to the `dataiesb` bucket and CloudFront distribution.
#
set -euo pipefail

BUCKET="dataiesb"
DISTRIBUTION_ID="E371T2F886B5KI"
AWS_PROFILE="${AWS_PROFILE:-iesb}"
export AWS_PROFILE

echo "==> Using AWS profile: ${AWS_PROFILE}"

if [[ ! -d out ]]; then
  echo "error: ./out not found. Run 'npm run build' first." >&2
  exit 1
fi

echo "==> Syncing ./out to s3://${BUCKET}"
aws s3 sync ./out "s3://${BUCKET}"

echo "==> Publishing clean route objects for the current CloudFront origin"
node scripts/static-route-objects.mjs out |
while IFS=$'\t' read -r file key; do
  aws s3api put-object \
    --bucket "${BUCKET}" \
    --key "${key}" \
    --body "${file}" \
    --content-type 'text/html; charset=utf-8' \
    --cache-control 'no-cache' >/dev/null
  echo "    put ${key}"
done

echo "==> Creating CloudFront invalidation (${DISTRIBUTION_ID})"
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "/*"

echo "==> Deploy complete."
